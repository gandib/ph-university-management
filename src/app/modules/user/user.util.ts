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
  // return lastStudent ? lastStudent : undefined;
  return lastStudent?.id ? lastStudent.id : undefined;
};

// year semsesterCode 4 digit number
export const generateStudentId = async (payload: TAcademicSemester) => {
  // first  time 0000
  let currentId = (0).toString();

  // const allStudentId = await findLastStudentId();
  // const lastId = allStudentId?.find(
  //   (id) => id.id.substring(0, 6) === `${payload.year}${payload.code}`,
  // );
  // const lastStudentId = lastId?.id;
  const lastStudentId = await findLastStudentId();
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

const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    {
      role: 'faculty',
    },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();
  // return lastStudent ? lastStudent : undefined;
  return lastFaculty?.id ? lastFaculty.id : undefined;
};

export const generateFacultyId = async () => {
  // first  time 0000
  let currentId = (0).toString();
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }

  let increamentId = (Number(currentId) + 1).toString().padStart(4, '0');
  increamentId = `F-${increamentId}`;
  return increamentId;
};

const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();
  // return lastStudent ? lastStudent : undefined;
  return lastAdmin?.id ? lastAdmin.id : undefined;
};

export const generateAdminId = async () => {
  // first  time 0000
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let increamentId = (Number(currentId) + 1).toString().padStart(4, '0');
  increamentId = `A-${increamentId}`;
  return increamentId;
};
