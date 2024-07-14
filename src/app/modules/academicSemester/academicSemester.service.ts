import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import {
  academicSemesterNameCodeMapper,
  acdemicSemesterSearchableFields,
} from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid semester code!');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemesters = async (query: Record<string, unknown>) => {
  const semesterQuery = new QueryBuilder(AcademicSemester.find(), query)
    .search(acdemicSemesterSearchableFields)
    .filter()
    .fields()
    .sort()
    .paginate();

  const result = await semesterQuery.modelQuery;
  const meta = await semesterQuery.countTotal();
  if (result.length <= 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic semester not found!');
  }
  return {
    meta,
    result,
  };
};

const getAcademicSemesterById = async (semesterId: string) => {
  const result = await AcademicSemester.findById(semesterId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic semester not found!');
  }
  return result;
};

const updateAcademicSemester = async (
  semesterId: string,
  payload: Partial<TAcademicSemester>,
) => {
  const acdemicSemester = await AcademicSemester.findById(semesterId);
  const isSemesterExists = await AcademicSemester.findOne({
    name: payload.name,
    year: payload.year,
  });

  if (isSemesterExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Semester is already exists!');
  } else if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid semester code!');
  } else if (!payload.name && payload.code) {
    if (
      academicSemesterNameCodeMapper[acdemicSemester?.name as string] !==
      payload.code
    ) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid semester code!');
    }
  } else if (payload.name && !payload.code) {
    if (
      academicSemesterNameCodeMapper[payload?.name] !== acdemicSemester?.code
    ) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid semester code!');
    }
  }

  const result = await AcademicSemester.findByIdAndUpdate(semesterId, payload, {
    new: true,
  });
  return result;
};

export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesters,
  getAcademicSemesterById,
  updateAcademicSemester,
};
