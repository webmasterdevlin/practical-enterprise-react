import React from 'react';
import { Container, makeStyles } from '@material-ui/core';

import Header from './Header';
import ProductCreateForm from './ProductCreateForm';

const ProductCreateView = () => {
  const classes = useStyles();

  return (
    <Container>
      <Header />
      <ProductCreateForm />
    </Container>
  );
};

const useStyles = makeStyles(theme => ({}));

export default ProductCreateView;
