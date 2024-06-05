import { semesterRegistrationValidations } from './semesterRegistration.validation';
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { semesterRegistrationControllers } from './semesterRegistration.controller';

const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    semesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.createSemesterRegistration,
);

router.get(
  '/:id',
  semesterRegistrationControllers.getSingleSemesterRegistration,
);

router.patch(
  '/:id',
  validateRequest(
    semesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.updateSemesterRegistration,
);

router.get('/', semesterRegistrationControllers.getAllSemesterRegistration);

export const semesterRegistrationRoutes = router;
