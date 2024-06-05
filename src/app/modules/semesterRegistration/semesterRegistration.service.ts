import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { AcademicSemester } from './../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  // check if the academic semester is exist
  const academicSemester = payload?.academicSemester;
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);

  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This Academic Semester is not found!',
    );
  }

  // check if the semester registration is already registered
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This semester is already registered!',
    );
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistration = async () => {
  const result = await SemesterRegistration.find();
  return result;
};
const getSingleSemesterRegistration = async () => {};
const updateSemesterRegistration = async () => {};

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
