import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { adminControllers } from './admin.controller';
import { adminValidations } from './admin.validation';

const router = express.Router();

router.get('/', adminControllers.getAllAdmins);

router.get('/:adminId', adminControllers.getAdminById);

router.delete('/:adminId', adminControllers.deleteAdmin);

router.patch(
  '/:adminId',
  validateRequest(adminValidations.updateAdminValidationSchema),
  adminControllers.updateAdminIntoDB,
);

export const adminRoutes = router;
