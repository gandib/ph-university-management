import { Student } from './student.model';

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getStudentByIdFromDB = async (id: string) => {
  // const result = await Student.findOne({ _id: id });
  const result = await Student.aggregate([
    // { $match: { id } },
    { $match: { $expr: { $eq: ['$_id', { $toObjectId: id }] } } },
  ]);
  console.log(result);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ _id: id }, { isDeleted: true });
  return result;
};

export const studentServices = {
  getAllStudentsFromDB,
  getStudentByIdFromDB,
  deleteStudentFromDB,
};
