import { facultyValidations } from './../Faculty/faculty.validation';
import express from 'express';
import { userControllers } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import { adminValidations } from '../Admin/admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { userValidations } from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateRequest(studentValidations.createStudentValidationSchema),
  userControllers.createStudent,
);

router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  validateRequest(facultyValidations.createFacultyValidationSchema),
  userControllers.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(adminValidations.createAdminValidationSchema),
  userControllers.createAdmin,
);

router.post(
  '/change-status/:id',
  auth(USER_ROLE.admin),
  validateRequest(userValidations.changeStatusValidationSchema),
  userControllers.changeStatus,
);

router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  userControllers.getMe,
);

export const userRoutes = router;
