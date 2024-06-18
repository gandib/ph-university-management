import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { enrolledCourseValidations } from './enrolledCourse.validation';
import { enrolledCourseControllers } from './enrolledCourse.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth(USER_ROLE.student),
  validateRequest(
    enrolledCourseValidations.createEnrolledCourseValidationSchema,
  ),
  enrolledCourseControllers.createEnrolledCourse,
);

export const enrolledCourseRoutes = router;
