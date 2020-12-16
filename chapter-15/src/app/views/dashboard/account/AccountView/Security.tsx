import React, { useState } from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  TextField,
  makeStyles,
} from '@material-ui/core';

import { changePasswordAxios, ChangePasswordModel } from 'services/authService';
import { RootState } from 'store/reducers';

type Props = {
  className?: string;
};

type PasswordType = {
  password: string;
  passwordConfirm: string;
};

const Security = ({ className, ...rest }: Props) => {
  const { claims } = useSelector((state: RootState) => state.auth);
  const classes = useStyles();
  const [error, setError] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={
        {
          password: '',
          passwordConfirm: '',
        } as PasswordType
      }
      validationSchema={Yup.object().shape({
        password: Yup.string()
          .min(7, 'Must be at least 7 characters')
          .max(255)
          .required('Required'),
        passwordConfirm: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Required'),
      })}
      onSubmit={async (values, formikHelpers) => {
        try {
          if (values.password !== values.passwordConfirm) {
            alert('Must match');
            return;
          }

          const args: ChangePasswordModel = {
            id: claims.sub,
            email: claims.email,
            password: values.password,
          };

          await changePasswordAxios(args);

          formikHelpers.resetForm();
          formikHelpers.setStatus({ success: true });
          formikHelpers.setSubmitting(false);
          enqueueSnackbar('Password updated', {
            variant: 'success',
          });
        } catch (err) {
          console.error(err);
          formikHelpers.setStatus({ success: false });
          formikHelpers.setSubmitting(false);
        }
      }}
    >
      {formikProps => (
        <form onSubmit={formikProps.handleSubmit}>
          <Card className={clsx(classes.root, className)} {...rest}>
            <CardHeader title="Change Password" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={4} sm={6} xs={12}>
                  <TextField
                    error={Boolean(
                      formikProps.touched.password &&
                        formikProps.errors.password,
                    )}
                    fullWidth
                    helperText={
                      formikProps.touched.password &&
                      formikProps.errors.password
                    }
                    label="Password"
                    name="password"
                    onBlur={formikProps.handleBlur}
                    onChange={formikProps.handleChange}
                    type="password"
                    value={formikProps.values.password}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <TextField
                    error={Boolean(
                      formikProps.touched.passwordConfirm &&
                        formikProps.errors.passwordConfirm,
                    )}
                    fullWidth
                    helperText={
                      formikProps.touched.passwordConfirm &&
                      formikProps.errors.passwordConfirm
                    }
                    label="Password Confirmation"
                    name="passwordConfirm"
                    onBlur={formikProps.handleBlur}
                    onChange={formikProps.handleChange}
                    type="password"
                    value={formikProps.values.passwordConfirm}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              {error && (
                <Box mt={3}>
                  <FormHelperText error>{error}</FormHelperText>
                </Box>
              )}
            </CardContent>
            <Divider />
            <Box p={2} display="flex" justifyContent="flex-end">
              <Button
                color="secondary"
                disabled={formikProps.isSubmitting}
                type="submit"
                variant="contained"
              >
                Change Password
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

const useStyles = makeStyles(() => ({
  root: {},
}));

export default Security;
