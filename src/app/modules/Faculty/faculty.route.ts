import express from 'express';
import { facultyControllers } from './faculty.controller';
import { facultyValidations } from './faculty.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.get('/', facultyControllers.getAllFaculties);

router.get('/:facultyId', facultyControllers.getFacultyById);

router.delete('/:facultyId', facultyControllers.deleteFaculty);

router.patch(
  '/:facultyId',
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  facultyControllers.updateFacultyIntoDB,
);

export const facultyRoutes = router;
