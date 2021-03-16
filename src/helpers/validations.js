import * as Yup from 'yup';

export const EditProfileSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters long!')
    .max(12, 'Username must be 12 characters at most!')
    .lowercase('Username must be lowercase only!')
    .required('Username is a required field!')
    .strict(),
  fullName: Yup.string()
    .min(3, 'Full name must be at least 3 characters long!')
    .max(34, 'Full name must be 34 characters at most!')
    .required('Full name is a required field!'),
  email: Yup.string()
    .email('Email address has a wrong format!')
    .required('Email address is a required field!'),
  website: Yup.string().url('Website link has a wrong format!'),
  phone: Yup.string().matches(
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
    'Phone number has a wrong format!',
  ),
  bio: Yup.string()
    .min(2, 'Bio must be at least 2 characters long!')
    .max(256, 'Bio must be 256 characters at most!'),
});

export const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Old password is a required field!'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long!')
    .max(24, 'Password must be 24 characters at most!')
    .required('Password is a required field!'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords do not match!')
    .required('Confirm password is a required field!'),
});

export const PrivacyAndSecuritySchema = Yup.object();

export const UserSignUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters long!')
    .max(12, 'Username must be 12 characters at most!')
    .required('Username is a required field'),
  fullName: Yup.string()
    .min(3, 'Full name must be at least 3 characters long!')
    .max(34, 'Full name must be 34 characters at most!')
    .required('Full name is a required field'),
  email: Yup.string()
    .email('Email address has a wrong format')
    .required('Email address is a required field'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long!')
    .max(24, 'Password must be 24 characters at most!')
    .required('Password is a required field'),
});

export const UserLoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email address has a wrong format')
    .required('Email address is a required field'),
  password: Yup.string()
    .min(6, 'Password must be atleast 6 characters long!')
    .max(24, 'Password must be 24 characters at most!')
    .required('Password is a required field'),
});

export const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email address has a wrong format')
    .required('Email address is a required field'),
});
