import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Paper,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';

import FilesDropzone from 'app/components/files-dropzone';
import QuillEditor from 'app/components/quill-editor';
import { postProductAxios } from 'services/productService';
import { yupProductValidation } from './schema/yupProductValidation';
import { productDefaultValue } from './schema/productDefaultValue';

const categories = [
  {
    id: 'shirts',
    name: 'Shirts',
  },
  {
    id: 'phones',
    name: 'Phones',
  },
  {
    id: 'cars',
    name: 'Cars',
  },
];

type Props = {
  className?: string;
};

const ProductCreateForm = ({ className, ...rest }: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState('');

  return (
    <Formik
      initialValues={productDefaultValue}
      validationSchema={yupProductValidation}
      onSubmit={async (values, formikHelpers) => {
        try {
          await postProductAxios(values);

          formikHelpers.setStatus({ success: true });
          formikHelpers.setSubmitting(false);
          enqueueSnackbar('Product Created', {
            variant: 'success',
          });
          history.push('/dashboard/list-products');
        } catch (err) {
          alert('Something happened. Please try again.');
          setError(err.message);
          formikHelpers.setStatus({ success: false });
          formikHelpers.setSubmitting(false);
        }
      }}
    >
      {formikProps => (
        <form
          onSubmit={formikProps.handleSubmit}
          className={clsx(classes.root, className)}
          {...rest}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Card>
                <CardContent>
                  <TextField
                    error={Boolean(
                      formikProps.touched.name && formikProps.errors.name,
                    )}
                    fullWidth
                    helperText={
                      formikProps.touched.name && formikProps.errors.name
                    }
                    label="Product Name"
                    name="name"
                    onBlur={formikProps.handleBlur}
                    onChange={formikProps.handleChange}
                    value={formikProps.values.name}
                    variant="outlined"
                  />
                  <Box mt={3} mb={1}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Description
                    </Typography>
                  </Box>
                  <Paper variant="outlined">
                    <QuillEditor
                      className={classes.editor}
                      value={formikProps.values.description}
                      onChange={(value: string) =>
                        formikProps.setFieldValue('description', value)
                      }
                    />
                  </Paper>
                  {formikProps.touched.description &&
                    formikProps.errors.description && (
                      <Box mt={2}>
                        <FormHelperText error>
                          {formikProps.errors.description}
                        </FormHelperText>
                      </Box>
                    )}
                </CardContent>
              </Card>
              <Box mt={3}>
                <Card>
                  <CardHeader title="Upload Images" />
                  <Divider />
                  <CardContent>
                    <FilesDropzone />
                  </CardContent>
                </Card>
              </Box>
              <Box mt={3}>
                <Card>
                  <CardHeader title="Prices" />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(
                            formikProps.touched.price &&
                              formikProps.errors.price,
                          )}
                          fullWidth
                          helperText={
                            formikProps.touched.price &&
                            formikProps.errors.price
                              ? formikProps.errors.price
                              : 'If you have a sale price this will be shown as old price'
                          }
                          label="Price"
                          name="price"
                          type="number"
                          onBlur={formikProps.handleBlur}
                          onChange={formikProps.handleChange}
                          value={formikProps.values.price}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(
                            formikProps.touched.salePrice &&
                              formikProps.errors.salePrice,
                          )}
                          fullWidth
                          helperText={
                            formikProps.touched.salePrice &&
                            formikProps.errors.salePrice
                          }
                          label="Sale price"
                          name="salePrice"
                          type="number"
                          onBlur={formikProps.handleBlur}
                          onChange={formikProps.handleChange}
                          value={formikProps.values.salePrice}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    <Box mt={2}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formikProps.values.isTaxable}
                            onChange={formikProps.handleChange}
                            value={formikProps.values.isTaxable}
                            name="isTaxable"
                          />
                        }
                        label="Product is taxable"
                      />
                    </Box>
                    <Box mt={2}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formikProps.values.includesTaxes}
                            onChange={formikProps.handleChange}
                            value={formikProps.values.includesTaxes}
                            name="includesTaxes"
                          />
                        }
                        label="Price includes taxes"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Card>
                <CardHeader title="Organize" />
                <Divider />
                <CardContent>
                  <TextField
                    fullWidth
                    label="Category"
                    name="category"
                    onChange={formikProps.handleChange}
                    select
                    SelectProps={{ native: true }}
                    value={formikProps.values.category}
                    variant="outlined"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </TextField>
                  <Box mt={2}>
                    <TextField
                      error={Boolean(
                        formikProps.touched.productCode &&
                          formikProps.errors.productCode,
                      )}
                      fullWidth
                      helperText={
                        formikProps.touched.productCode &&
                        formikProps.errors.productCode
                      }
                      label="Product Code"
                      name="productCode"
                      onBlur={formikProps.handleBlur}
                      onChange={formikProps.handleChange}
                      value={formikProps.values.productCode}
                      variant="outlined"
                    />
                  </Box>
                  <Box mt={2}>
                    <TextField
                      error={Boolean(
                        formikProps.touched.productSku &&
                          formikProps.errors.productSku,
                      )}
                      fullWidth
                      helperText={
                        formikProps.touched.productSku &&
                        formikProps.errors.productSku
                      }
                      label="Product Sku"
                      name="productSku"
                      onBlur={formikProps.handleBlur}
                      onChange={formikProps.handleChange}
                      value={formikProps.values.productSku}
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          {error && (
            <Box mt={3}>
              <FormHelperText error>{error}</FormHelperText>
            </Box>
          )}
          <Box mt={2}>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={formikProps.isSubmitting}
            >
              Create product
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

const useStyles = makeStyles(() => ({
  root: {},
  editor: {
    '& .ql-editor': {
      height: 400,
    },
  },
}));

export default ProductCreateForm;
