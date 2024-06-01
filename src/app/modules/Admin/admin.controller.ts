import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../errors/appError';
import { adminServices } from './admin.service';
import { Admin } from './admin.model';

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await adminServices.getAllAdminsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins are retrieved successfully!',
    data: result,
  });
});

const getAdminById = catchAsync(async (req, res) => {
  const { adminId } = req.params;
  const isUserExist = await Admin.isUserExists(adminId);
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Admin not exist!');
  }

  const result = await adminServices.getAdminByIdFromDB(adminId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is retrieved successfully!',
    data: result,
  });
});

const updateAdminIntoDB = catchAsync(async (req, res) => {
  const { adminId } = req.params;
  const { admin } = req.body;
  const isUserExist = await Admin.isUserExists(adminId);
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Admin not exist!');
  }

  const result = await adminServices.updateAdminIntoDB(adminId, admin);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is updated successfully!',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const { adminId } = req.params;
  const isUserExist = await Admin.isUserExists(adminId);
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Admin not exist!');
  }
  const result = await adminServices.deleteAdminFromDB(adminId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is deleted successfully!',
    data: result,
  });
});

export const adminControllers = {
  getAllAdmins,
  getAdminById,
  deleteAdmin,
  updateAdminIntoDB,
};
