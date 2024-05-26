import { userServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  // data validation using Zod
  //   const zodParsedData = studentValidationSchema.parse(studentData);

  // will call service function to send this data
  const result = await userServices.createUserIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully!',
    data: result,
  });
});

export const userControllers = {
  createStudent,
};
