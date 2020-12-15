/* Validation for each input of profile form */
import * as Yup from 'yup';

const profileYupObject = Yup.object().shape({
  canHire: Yup.bool(),
  city: Yup.string().max(255),
  country: Yup.string().max(255),
  email: Yup.string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  isPublic: Yup.bool(),
  name: Yup.string().max(255).required('Name is required'),
  phone: Yup.string(),
  state: Yup.string(),
});

export { profileYupObject };
