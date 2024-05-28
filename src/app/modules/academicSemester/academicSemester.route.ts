import expree from 'express';
import { academicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidations } from './academicSemester.validation';

const router = expree.Router();

router.post(
  '/create-academic-semester',
  validateRequest(academicSemesterValidations.createAScademicValidationSchema),
  academicSemesterControllers.createAcademicSemester,
);
router.get(
  '/:semesterId',
  academicSemesterControllers.getAllAcademicSemesterById,
);
router.patch(
  '/:semesterId',
  validateRequest(academicSemesterValidations.updateAScademicValidationSchema),
  academicSemesterControllers.updateAcademicSemester,
);
router.get('/', academicSemesterControllers.getAllAcademicSemesters);

export const academicSemesterRoutes = router;
