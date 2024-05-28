import { AcademicDepartment } from './academicDepartment.model';
import { TAcademicDepartment } from './academicDepartment.interface';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartments = async () => {
  const result = await AcademicDepartment.find();
  return result;
};

const getAcademicDepartmentById = async (id: string) => {
  const result = await AcademicDepartment.findById(id);
  return result;
};

const updateAcademicDepartment = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const academicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartments,
  getAcademicDepartmentById,
  updateAcademicDepartment,
};
