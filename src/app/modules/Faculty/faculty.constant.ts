import { TFacultyBloodGroup, TFacultyGender } from './faculty.interface';

export const gender: TFacultyGender[] = ['male', 'female', 'other'];

export const bloodGroup: TFacultyBloodGroup[] = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
];

export const facultySearchableFields = [
  'email',
  'id',
  'contactNo',
  'emergencyContactNo',
  'name.firstName',
  'name.lastName',
  'name.middleName',
];
