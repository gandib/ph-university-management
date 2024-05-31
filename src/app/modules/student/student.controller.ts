import { studentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { Student } from './student.model';
import AppError from '../../errors/appError';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await studentServices.getAllStudentsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students are retrieved successfully!',
    data: result,
  });
});

const getStudentById = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const isUserExist = await Student.isUserExists(studentId);
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Student not exist!');
  }

  const result = await studentServices.getStudentByIdFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is retrieved successfully!',
    data: result,
  });
});

const updateStudentIntoDB = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const isUserExist = await Student.isUserExists(studentId);
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Student not exist!');
  }

  const result = await studentServices.updateStudentIntoDB(studentId, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated successfully!',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const isUserExist = await Student.isUserExists(studentId);
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Student not exist!');
  }
  const result = await studentServices.deleteStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is deleted successfully!',
    data: result,
  });
});

export const studentControllers = {
  getAllStudents,
  getStudentById,
  deleteStudent,
  updateStudentIntoDB,
};
