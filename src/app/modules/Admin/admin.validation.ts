import { z } from 'zod';
import { bloodGroup, gender } from './admin.constant';

// Define Zod schema for the userNameSchema
const createAdminUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .regex(/^[A-Z][a-z]*$/, {
      message:
        'First name must start with a capital letter and contain only alphabetic characters',
    }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1)
    .regex(/^[A-Za-z]+$/, {
      message: 'Last name must contain only alphabetic characters',
    }),
});

const updateAdminUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .regex(/^[A-Z][a-z]*$/, {
      message:
        'First name must start with a capital letter and contain only alphabetic characters',
    })
    .optional(),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1)
    .regex(/^[A-Za-z]+$/, {
      message: 'Last name must contain only alphabetic characters',
    })
    .optional(),
});

// Define Zod schema for studentSchema
const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    admin: z.object({
      designation: z.string(),
      name: createAdminUserNameValidationSchema,
      gender: z.enum([...gender] as [string, ...string[]]),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string().min(1),
      emergencyContactNo: z.string().min(1),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string().min(1),
      permanentAddress: z.string().min(1),
    }),
  }),
});

const updateAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: z.object({
      designation: z.string().optional(),
      name: updateAdminUserNameValidationSchema.optional(),
      gender: z.enum([...gender] as [string, ...string[]]).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().min(1).optional(),
      emergencyContactNo: z.string().min(1).optional(),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string().min(1).optional(),
      permanentAddress: z.string().min(1).optional(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const adminValidations = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
