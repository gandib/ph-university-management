import Joi from 'joi';

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .max(20)
    .pattern(/^[A-Z][a-z]*$/)
    .messages({
      'string.base': 'First name must be a string',
      'string.empty': 'First name is required',
      'string.max': 'First name cannot be more than {#limit} characters',
      'string.pattern.base':
        'First name must start with a capital letter and contain only alphabetic characters',
    }),
  middleName: Joi.string(),
  lastName: Joi.string()
    .required()
    .pattern(/^[A-Za-z]+$/)
    .messages({
      'string.base': 'Last name must be a string',
      'string.empty': 'Last name is required',
      'string.pattern.base':
        'Last name must contain only alphabetic characters',
    }),
});

// Define Joi schema for guardianSchema

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.base': 'Father name must be a string',
    'string.empty': 'Father name is required',
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.base': 'Father occupation must be a string',
    'string.empty': 'Father occupation is required',
  }),
  fatherContactNo: Joi.string().required().messages({
    'string.base': 'Father contact number must be a string',
    'string.empty': 'Father contact number is required',
  }),
  motherName: Joi.string().required().messages({
    'string.base': 'Mother name must be a string',
    'string.empty': 'Mother name is required',
  }),
  motherOccupation: Joi.string().required().messages({
    'string.base': 'Mother occupation must be a string',
    'string.empty': 'Mother occupation is required',
  }),
  motherContactNo: Joi.string().required().messages({
    'string.base': 'Mother contact number must be a string',
    'string.empty': 'Mother contact number is required',
  }),
});

// Define Joi schema for localGuardianSchema
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Local guardian name must be a string',
    'string.empty': 'Local guardian name is required',
  }),
  occupation: Joi.string().required().messages({
    'string.base': 'Local guardian occupation must be a string',
    'string.empty': 'Local guardian occupation is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.base': 'Local guardian contact number must be a string',
    'string.empty': 'Local guardian contact number is required',
  }),
  address: Joi.string().required().messages({
    'string.base': 'Local guardian address must be a string',
    'string.empty': 'Local guardian address is required',
  }),
});

// Define Joi schema for studentSchema
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.base': 'ID must be a string',
    'string.empty': 'ID is required',
  }),
  name: userNameValidationSchema,
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': 'Gender must be one of "male", "female", or "other"',
    'any.required': 'Gender is required',
  }),
  dateOfBirth: Joi.string(),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address',
    'string.empty': 'Email is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.base': 'Contact number must be a string',
    'string.empty': 'Contact number is required',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'string.base': 'Emergency contact number must be a string',
    'string.empty': 'Emergency contact number is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .messages({
      'any.only':
        'Blood group must be one of "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", or "O-"',
    }),
  presentAddress: Joi.string().required().messages({
    'string.base': 'Present address must be a string',
    'string.empty': 'Present address is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'string.base': 'Permanent address must be a string',
    'string.empty': 'Permanent address is required',
  }),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: Joi.string(),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'any.only': 'isActive must be one of "active" or "blocked"',
  }),
});

export default studentValidationSchema;
