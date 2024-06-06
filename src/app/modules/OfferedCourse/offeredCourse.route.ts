import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { offeredCourseControllers } from './offeredCourse.controller';
import { offeredCourseValidations } from './offeredCourse.validation';

const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(offeredCourseValidations.createOfferedCourseValidationSchema),
  offeredCourseControllers.createOfferedCourse,
);

router.get('/:id', offeredCourseControllers.getAllOfferedCourse);

router.patch(
  '/:id',
  validateRequest(offeredCourseValidations.updateOfferedCourseValidationSchema),
  offeredCourseControllers.updateOfferedCourse,
);

router.get('/', offeredCourseControllers.getAllOfferedCourse);

export const offeredCourseRoutes = router;
