// validationSchema.js
import * as yup from 'yup';

export const profileSchema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  dob: yup
    .date()
    .required('Date of birth is required')
    .typeError('Date of birth must be a valid date'),
  mobileNumber: yup
    .string()
    .matches(/^\d{10}$/, 'Mobile number must be 10 digits')
    .required('Mobile number is required'),
  gender: yup
    .string()
    .oneOf(['Male', 'Female', 'Other'], 'Select a valid gender')
    .required('Gender is required'),
});
