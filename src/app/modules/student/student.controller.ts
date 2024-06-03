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
  const { id } = req.params;
  const isUserExist = await Student.isUserExists(id);
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Student not exist!');
  }

  const result = await studentServices.getStudentByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is retrieved successfully!',
    data: result,
  });
});

const updateStudentIntoDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;
  const isUserExist = await Student.isUserExists(id);
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Student not exist!');
  }

  const result = await studentServices.updateStudentIntoDB(id, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated successfully!',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const isUserExist = await Student.isUserExists(id);
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Student not exist!');
  }
  const result = await studentServices.deleteStudentFromDB(id);

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
