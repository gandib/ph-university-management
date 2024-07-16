import { Schema, model } from 'mongoose';
import { FacultyModel, TFaculty, TFacultyUserName } from './faculty.interface';
import { bloodGroup, gender } from './faculty.constant';

const facultyUserNameSchema = new Schema<TFacultyUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [20, 'First name can not be more 20 characters.'],
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
});

const facultySchema = new Schema<TFaculty, FacultyModel>(
  {
    id: { type: String, required: [true, 'Id is required'], unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User Id is required'],
      unique: true,
      ref: 'User',
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
    },
    name: {
      type: facultyUserNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: gender,
        message: '{VALUE} is not valid',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: bloodGroup,
        message:
          "{VALUE} is not valid blood group. The blood group field can only be one of the following: 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'.",
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    profileImg: { type: String, default: '' },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, 'Academic department is required'],
      ref: 'AcademicDepartment',
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: [true, 'Academic faculty is required'],
      ref: 'AcademicFaculty',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

facultySchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Faculty.findById(id);
  return existingUser;
};

facultySchema.statics.isFacultyExists = async function (email: string) {
  const existingFaculty = await Faculty.findOne({ email });
  return existingFaculty;
};

export const Faculty = model<TFaculty, FacultyModel>('Faculty', facultySchema);
