import express from 'express';
import { courseControllers } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidations } from './course.validation';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(courseValidations.createCourseValidationSchema),
  courseControllers.createCourse,
);

router.get('/:id', courseControllers.getCourseById);

router.patch(
  '/:id',
  validateRequest(courseValidations.updateCourseValidationSchema),
  courseControllers.updateCourse,
);

router.delete('/:id', courseControllers.deleteCourse);

router.put(
  '/:courseId/assign-faculties',
  validateRequest(courseValidations.facultiesWithCourseValidationSchema),
  courseControllers.assignFacultiesWithCourse,
);

router.delete(
  '/:courseId/remove-faculties',
  courseControllers.removeFacultiesFromCourse,
);

router.get('/', courseControllers.getAllCoursesFromDB);

export const courseRoutes = router;
