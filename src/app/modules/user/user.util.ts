import { User } from './user.model';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

// year semsesterCode 4 digit number
export const generateStudentId = async (payload: TAcademicSemester) => {
  // first  time 0000
  const currentId = (await findLastStudentId()) || (0).toString();
  let increamentId = (Number(currentId) + 1).toString().padStart(4, '0');
  increamentId = `${payload.year}${payload.code}${increamentId}`;
  return increamentId;
};
