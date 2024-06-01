import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../errors/appError';
import { facultyServices } from './faculty.service';
import { Faculty } from './faculty.model';

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await facultyServices.getAllFacultiesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties are retrieved successfully!',
    data: result,
  });
});

const getFacultyById = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const isUserExist = await Faculty.isUserExists(facultyId);
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Faculty not exist!');
  }

  const result = await facultyServices.getFacultyByIdFromDB(facultyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is retrieved successfully!',
    data: result,
  });
});

const updateFacultyIntoDB = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const { faculty } = req.body;
  const isUserExist = await Faculty.isUserExists(facultyId);
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Student not exist!');
  }

  const result = await facultyServices.updateFacultyIntoDB(facultyId, faculty);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is updated successfully!',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const isUserExist = await Faculty.isUserExists(facultyId);
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Faculty not exist!');
  }
  const result = await facultyServices.deleteFacultyFromDB(facultyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is deleted successfully!',
    data: result,
  });
});

export const facultyControllers = {
  getAllFaculties,
  getFacultyById,
  deleteFaculty,
  updateFacultyIntoDB,
};
