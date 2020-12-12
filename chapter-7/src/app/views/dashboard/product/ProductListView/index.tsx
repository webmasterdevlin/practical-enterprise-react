import React from 'react';
import { Container, makeStyles } from '@material-ui/core';

import Header from './Header';
import Results from './Results';

const ProductListView = () => {
  const classes = useStyles();

  return (
    <Container>
      <Header />
      <Results />
    </Container>
  );
};

const useStyles = makeStyles(theme => ({}));

export default ProductListView;
