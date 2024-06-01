import { TAdminBloodGroup, TAdminGender } from './admin.interface';

export const gender: TAdminGender[] = ['male', 'female', 'other'];

export const bloodGroup: TAdminBloodGroup[] = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
];

export const adminSearchableFields = [
  'email',
  'id',
  'contactNo',
  'emergencyContactNo',
  'name.firstName',
  'name.lastName',
  'name.middleName',
];
