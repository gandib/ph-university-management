import { Router } from 'express';
import { userRoutes } from '../modules/user/user.route';
import { studentRoutes } from '../modules/student/student.route';
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { acdemicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { acdemicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { facultyRoutes } from '../modules/Faculty/faculty.route';
import { adminRoutes } from '../modules/Admin/admin.route';

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
  {
    path: '/faculties',
    route: facultyRoutes,
  },
  {
    path: '/admins',
    route: adminRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
