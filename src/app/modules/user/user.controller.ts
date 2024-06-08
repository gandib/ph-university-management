import { userServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { Student } from '../student/student.model';
import AppError from '../../errors/appError';
import { Faculty } from '../Faculty/faculty.model';
import { Admin } from '../Admin/admin.model';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const isStudentExists = await Student.isStudentExists(studentData.email);
  if (isStudentExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Student already exists!');
  }

  // will call service function to send this data
  const result = await userServices.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully!',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;
  const isFacultyExists = await Faculty.isFacultyExists(facultyData.email);
  if (isFacultyExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Faculty already exists!');
  }

  const result = await userServices.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created successfully!',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;
  const isAdminExists = await Admin.isAdminExists(adminData.email);
  if (isAdminExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Admin already exists!');
  }

  const result = await userServices.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created successfully!',
    data: result,
  });
});

export const userControllers = {
  createStudent,
  createFaculty,
  createAdmin,
};
