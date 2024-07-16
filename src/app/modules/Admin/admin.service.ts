import mongoose from 'mongoose';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { Admin } from './admin.model';
import { adminSearchableFields } from './admin.constant';
import { TAdmin } from './admin.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(adminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;
  const meta = await adminQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getAdminByIdFromDB = async (id: string) => {
  const result = await Admin.findById(id);
  return result;
};

const updateAdminIntoDB = async (
  id: string,
  payload: Partial<TAdmin>,
  password: string,
) => {
  const { name, ...remainingAdminData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (password) {
    const adminId = await Admin.findById(id).select('id');

    const user = await User.findOne({ id: adminId?.id });
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'Admin not found!');
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

  const result = await Admin.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
  });

  return result;
};

const deleteAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const isAdminExist = await Admin.isUserExists(id);
    if (!isAdminExist) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Admin not exist!');
    }

    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to delete an admin!');
    }

    const userId = deletedAdmin?.user;

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

    return deletedAdmin;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Faild to delete an admin!');
  }
};

export const adminServices = {
  getAllAdminsFromDB,
  getAdminByIdFromDB,
  deleteAdminFromDB,
  updateAdminIntoDB,
};
