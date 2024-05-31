import { userServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { Student } from '../student/student.model';
import AppError from '../../errors/appError';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const isStudentExists = await Student.isStudentExists(studentData.email);
  if (isStudentExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Student already exists!');
  }

  // will call service function to send this data
  const result = await userServices.createUserIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully!',
    data: result,
  });
});

export const userControllers = {
  createStudent,
};
