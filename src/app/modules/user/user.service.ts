import { Student } from './../student/student.model';
import { AcademicSemester } from './../academicSemester/academicSemester.model';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.util';

const createUserIntoDB = async (password: string, payload: TStudent) => {
  // creating custom static method
  //   if (await Student.isUserExists(studentData.id)) {
  //     throw new Error('User already exists!');
  //   }

  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_password as string);
  userData.role = 'student';

  // find academic semester info
  const academicSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  userData.id = await generateStudentId(academicSemester);

  // check existing student
  const existingStudent = await Student.findOne({ email: payload.email });
  // create an user
  if (existingStudent) {
    throw new Error('Student already exists!');
  }
  const newUser = await User.create(userData);
  // create a student
  if (Object.keys(newUser).length) {
    // set id, _id as user
    payload.id = newUser.id;
    payload.user = newUser._id;

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const userServices = {
  createUserIntoDB,
};
