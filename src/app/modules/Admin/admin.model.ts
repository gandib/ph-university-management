import { Schema, model } from 'mongoose';
import { AdminModel, TAdmin, TAdminUserName } from './admin.interface';
import { bloodGroup, gender } from './admin.constant';

const adminUserNameSchema = new Schema<TAdminUserName>({
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

const adminSchema = new Schema<TAdmin, AdminModel>(
  {
    id: { type: String, required: [true, 'Id is required'], unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'Faculty Id is required'],
      unique: true,
      ref: 'User',
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
    },
    name: {
      type: adminUserNameSchema,
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
    profileImg: { type: String },
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

adminSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Admin.findById(id);
  return existingUser;
};

adminSchema.statics.isAdminExists = async function (email: string) {
  const existingAdmin = await Admin.findOne({ email });
  return existingAdmin;
};

export const Admin = model<TAdmin, AdminModel>('Admin', adminSchema);
