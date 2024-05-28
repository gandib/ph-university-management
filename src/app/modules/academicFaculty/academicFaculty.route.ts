import express from 'express';
import { academicFacultyControllers } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyValidations } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(
    academicFacultyValidations.createAcademicFacultyValidationSchema,
  ),
  academicFacultyControllers.createAcademicFacultyIntoDB,
);
router.get('/:facultyId', academicFacultyControllers.getAcademicFacultyById);
router.patch(
  '/:facultyId',
  validateRequest(
    academicFacultyValidations.updateAcademicFacultyValidationSchema,
  ),
  academicFacultyControllers.updateAcademicFaculty,
);
router.get('/', academicFacultyControllers.getAllAcademicFaculties);

export const acdemicFacultyRoutes = router;
