import { z } from 'zod';

// Define Zod schema for the userNameSchema
const userNameValidationSchema = z.object({
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

// Define Zod schema for guardianSchema
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherContactNo: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
  motherContactNo: z.string().min(1),
});

// Define Zod schema for localGuardianSchema
const localGuardianValidationSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
  address: z.string().min(1),
});

// Define Zod schema for studentSchema
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string().min(1),
      emergencyContactNo: z.string().min(1),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().min(1),
      permanentAddress: z.string().min(1),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImg: z.string().optional(),
      admissionSemester: z.string(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
};
