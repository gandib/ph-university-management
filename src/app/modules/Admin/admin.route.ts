import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { adminControllers } from './admin.controller';
import { adminValidations } from './admin.validation';

const router = express.Router();

router.get('/', adminControllers.getAllAdmins);

router.get('/:id', adminControllers.getAdminById);

router.delete('/:id', adminControllers.deleteAdmin);

router.patch(
  '/:id',
  validateRequest(adminValidations.updateAdminValidationSchema),
  adminControllers.updateAdminIntoDB,
);

export const adminRoutes = router;
