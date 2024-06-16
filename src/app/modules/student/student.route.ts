import express from 'express';
import { studentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/', studentControllers.getAllStudents);

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  studentControllers.getStudentById,
);

router.delete('/:id', studentControllers.deleteStudent);

router.patch(
  '/:id',
  validateRequest(studentValidations.updateStudentValidationSchema),
  studentControllers.updateStudentIntoDB,
);

export const studentRoutes = router;
