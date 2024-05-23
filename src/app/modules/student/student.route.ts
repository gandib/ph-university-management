import express from 'express';
import { studentControllers } from './student.controller';

const router = express.Router();

router.get('/', studentControllers.getAllStudents);

router.get('/:studentId', studentControllers.getStudentById);

router.delete('/:studentId', studentControllers.deleteStudent);

export const studentRoutes = router;
