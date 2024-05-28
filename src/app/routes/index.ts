import { Router } from 'express';
import { userRoutes } from '../modules/user/user.route';
import { studentRoutes } from '../modules/student/student.route';
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { acdemicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { acdemicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';

const router = Router();
const modulesRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/students',
    route: studentRoutes,
  },
  {
    path: '/academic-semesters',
    route: academicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: acdemicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: acdemicDepartmentRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
