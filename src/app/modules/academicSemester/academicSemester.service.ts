import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester code!');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemesters = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getAllAcademicSemesterById = async (semesterId: string) => {
  const result = await AcademicSemester.findById(semesterId);
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
    throw new Error('Semester is already exists!');
  } else if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid semester code!');
  } else if (!payload.name && payload.code) {
    if (
      academicSemesterNameCodeMapper[acdemicSemester?.name as string] !==
      payload.code
    ) {
      throw new Error('Invalid semester code!');
    }
  } else if (payload.name && !payload.code) {
    if (
      academicSemesterNameCodeMapper[payload?.name] !== acdemicSemester?.code
    ) {
      throw new Error('Invalid semester code!');
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
  getAllAcademicSemesterById,
  updateAcademicSemester,
};
