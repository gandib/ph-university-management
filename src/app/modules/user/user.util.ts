import { User } from './user.model';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';

const findLastStudentId = async () => {
  const lastStudent = await User.find(
    {
      role: 'student',
    },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent ? lastStudent : undefined;
};

// year semsesterCode 4 digit number
export const generateStudentId = async (payload: TAcademicSemester) => {
  // first  time 0000
  let currentId = (0).toString();

  const allStudentId = await findLastStudentId();
  const lastId = allStudentId?.find(
    (id) => id.id.substring(0, 6) === `${payload.year}${payload.code}`,
  );
  const lastStudentId = lastId?.id;
  const lastStudentYear = lastStudentId?.substring(0, 4);
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const currentYear = payload.year;
  const currentSemesterCode = payload.code;

  if (
    lastStudentId &&
    lastStudentYear === currentYear &&
    lastStudentSemesterCode === currentSemesterCode
  ) {
    currentId = lastStudentId.substring(6);
  }

  let increamentId = (Number(currentId) + 1).toString().padStart(4, '0');
  increamentId = `${payload.year}${payload.code}${increamentId}`;
  return increamentId;
};
