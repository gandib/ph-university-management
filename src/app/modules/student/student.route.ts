import express from 'express';
import { studentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation';

const router = express.Router();

router.get('/', studentControllers.getAllStudents);

router.get('/:id', studentControllers.getStudentById);

router.delete('/:id', studentControllers.deleteStudent);

router.patch(
  '/:id',
  validateRequest(studentValidations.updateStudentValidationSchema),
  studentControllers.updateStudentIntoDB,
);

export const studentRoutes = router;
