import mongoose from 'mongoose';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { Faculty } from './faculty.model';
import { facultySearchableFields } from './faculty.constant';
import { TFaculty } from './faculty.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    Faculty.find().populate('academicDepartment academicFaculty'),
    query,
  )
    .search(facultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;
  const meta = await facultyQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getFacultyByIdFromDB = async (id: string) => {
  const result = await Faculty.findById(id).populate('academicDepartment');
  return result;
};

const updateFacultyIntoDB = async (
  id: string,
  payload: Partial<TFaculty>,
  password: string,
) => {
  const { name, ...remainingFacultyData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (password) {
    const facultyId = await Faculty.findById(id).select('id');

    const user = await User.findOne({ id: facultyId?.id });
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found!');
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt_salt_rounds),
    );

    await User.findByIdAndUpdate(
      user?._id,
      { password: hashedPassword },
      { new: true },
    );
  }

  const result = await Faculty.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const isFacultyExist = await Faculty.isUserExists(id);
    if (!isFacultyExist) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faculty not exist!');
    }

    const deletedFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to delete a faculty!');
    }

    const userId = deletedFaculty?.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to delete an user!');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedFaculty;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Faild to delete faculty!');
  }
};

export const facultyServices = {
  getAllFacultiesFromDB,
  getFacultyByIdFromDB,
  deleteFacultyFromDB,
  updateFacultyIntoDB,
};
