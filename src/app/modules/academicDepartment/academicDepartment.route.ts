import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicDepartmentControllers } from './academicDepartment.controller';
import { academicDepartmentValidations } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create-academic-department',
  validateRequest(
    academicDepartmentValidations.createAcademicDepartmentValidationSchema,
  ),
  academicDepartmentControllers.createAcademicDepartmentIntoDB,
);
router.get(
  '/:departmentId',
  academicDepartmentControllers.getAcademicDepartmentById,
);
router.patch(
  '/:departmentId',
  validateRequest(
    academicDepartmentValidations.updateAcademicDepartmentValidationSchema,
  ),
  academicDepartmentControllers.updateAcademicDepartment,
);
router.get('/', academicDepartmentControllers.getAllAcademicDepartments);

export const acdemicDepartmentRoutes = router;
