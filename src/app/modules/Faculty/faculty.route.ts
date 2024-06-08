import express from 'express';
import { facultyControllers } from './faculty.controller';
import { facultyValidations } from './faculty.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', auth(), facultyControllers.getAllFaculties);

router.get('/:id', facultyControllers.getFacultyById);

router.delete('/:id', facultyControllers.deleteFaculty);

router.patch(
  '/:id',
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  facultyControllers.updateFacultyIntoDB,
);

export const facultyRoutes = router;
