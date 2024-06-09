import express from 'express';
import { facultyControllers } from './faculty.controller';
import { facultyValidations } from './faculty.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  facultyControllers.getAllFaculties,
);

router.get('/:id', facultyControllers.getFacultyById);

router.delete('/:id', facultyControllers.deleteFaculty);

router.patch(
  '/:id',
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  facultyControllers.updateFacultyIntoDB,
);

export const facultyRoutes = router;
