import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await StudentModel.create(studentData); // built in static method by moongose

  const student = new Student(studentData); // creating instance
  if (await student.isUserExists(studentData.id)) {
    throw new Error('User already exists!');
  }

  const result = await student.save(); // built in instance method by moongose

  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getStudentByIdFromDB = async (id: string) => {
  const result = await Student.find({ _id: id });
  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getStudentByIdFromDB,
};
