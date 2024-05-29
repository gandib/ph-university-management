import { Student } from './../student/student.model';
import { AcademicSemester } from './../academicSemester/academicSemester.model';
import config from '../../config';
import { TStudent } from '../student/student.interface';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.util';
import mongoose from 'mongoose';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';

const createUserIntoDB = async (password: string, payload: TStudent) => {
  // creating custom static method

  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_password as string);
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // set generated id
    userData.id = await generateStudentId(admissionSemester);

    // create an user (transaction-1)
    // transaction data array hishebe dite hoy, data pabo array hishebe, r object hishebe pabo na
    const newUser = await User.create([userData], { session });
    console.log(newUser);
    // create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create user!');
    }
    // set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // create a student (transaction-2)
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create student!');
    }

    // permanently save to database, because user, student created successfully
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create student!');
  }
};

export const userServices = {
  createUserIntoDB,
};
