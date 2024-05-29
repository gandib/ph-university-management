import express from 'express';
import { studentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation';

const router = express.Router();

router.get('/', studentControllers.getAllStudents);

router.get('/:studentId', studentControllers.getStudentById);

router.delete('/:studentId', studentControllers.deleteStudent);

router.patch(
  '/:studentId',
  validateRequest(studentValidations.updateStudentValidationSchema),
  studentControllers.updateStudentIntoDB,
);

export const studentRoutes = router;
