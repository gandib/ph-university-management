import { Student } from './../student/student.model';
import { AcademicSemester } from './../academicSemester/academicSemester.model';
import config from '../../config';
import { TStudent } from '../student/student.interface';
import { TUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.util';
import mongoose from 'mongoose';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';
import { TFaculty } from '../Faculty/faculty.interface';
import { Faculty } from '../Faculty/faculty.model';
import { TAdmin } from '../Admin/admin.interface';
import { Admin } from '../Admin/admin.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { USER_ROLE } from './user.constant';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const isStudentExists = await Student.isStudentExists(payload?.email);
  if (isStudentExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Student already exists!');
  }

  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_password as string);
  // set student role
  userData.role = 'student';
  // set student email
  userData.email = payload?.email;

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  if (!admissionSemester) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Admission semester is not found!',
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // set generated id
    userData.id = await generateStudentId(admissionSemester);

    // send image to cloudinary
    sendImageToCloudinary();

    // create an user (transaction-1)
    // transaction data array hishebe dite hoy, data pabo array hishebe, r object hishebe pabo na
    const newUser = await User.create([userData], { session });
    // create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create an user!');
    }
    // set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // create a student (transaction-2)
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create a student!');
    }

    // permanently save to database, because user and student created successfully
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  const isFacultyExists = await Faculty.isFacultyExists(payload?.email);
  if (isFacultyExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Faculty already exists!');
  }

  // create a user object
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);
  // set faculty role
  userData.role = 'faculty';
  // set faculty email
  userData.email = payload?.email;

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Academic Department not found!',
    );
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // set generated id
    userData.id = await generateFacultyId();
    const newUser = await User.create([userData], { session });
    // create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create an user!');
    }
    // set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // create a faculty (transaction-2)
    const newFaculty = await Faculty.create([payload], { session });
    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create a faculty!');
    }

    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  const isAdminExists = await Admin.isAdminExists(payload?.email);
  if (isAdminExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Admin already exists!');
  }
  // create a user object
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);
  // set admin role
  userData.role = 'admin';
  // set admin email
  userData.email = payload?.email;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // set generated id
    userData.id = await generateAdminId();
    const newUser = await User.create([userData], { session });
    // create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create an user!');
    }
    // set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });
    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create an admin!');
    }

    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const getMe = async (userId: string, role: string) => {
  let result = null;

  if (role === USER_ROLE.student) {
    result = await Student.findOne({ id: userId }).populate('user');
  }
  if (role === USER_ROLE.faculty) {
    result = await Faculty.findOne({ id: userId }).populate('user');
  }
  if (role === USER_ROLE.admin) {
    result = await Admin.findOne({ id: userId }).populate('user');
  }

  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const userServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMe,
  changeStatus,
};
