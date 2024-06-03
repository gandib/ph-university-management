import express from 'express';
import { facultyControllers } from './faculty.controller';
import { facultyValidations } from './faculty.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.get('/', facultyControllers.getAllFaculties);

router.get('/:id', facultyControllers.getFacultyById);

router.delete('/:id', facultyControllers.deleteFaculty);

router.patch(
  '/:id',
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  facultyControllers.updateFacultyIntoDB,
);

export const facultyRoutes = router;
