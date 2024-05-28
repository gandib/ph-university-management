import z from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department must be string!',
      required_error: 'Name is required!',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Faculty id must be string!',
      required_error: 'Faculty id is required!',
    }),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic Department must be string!',
        required_error: 'Name is required!',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'Academic Faculty id must be string!',
        required_error: 'Faculty id is required!',
      })
      .optional(),
  }),
});

export const academicDepartmentValidations = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
