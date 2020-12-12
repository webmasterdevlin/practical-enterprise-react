import React, { useState, useEffect } from 'react';
import { createStyles } from '@material-ui/core/styles';
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  makeStyles,
} from '@material-ui/core';

import Header from './Header';
import Results from './Results';
import Page from 'app/components/page';
import { ProductType } from 'models/product-type';
import { getProductsAxios } from 'services/productService';

const ProductListView = () => {
  const classes = useStyles();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    fetchProducts().then();
  }, []);

  const fetchProducts = async () => {
    handleToggle();
    try {
      const { data } = await getProductsAxios();
      setProducts(data);
    } catch (e) {
      alert('Something happened');
    }
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Page className={classes.root} title="Product List">
      <Container maxWidth={false}>
        <Header />
        {products && (
          <Box mt={3}>
            <Results products={products} />
          </Box>
        )}
        <Backdrop
          className={classes.backdrop}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
    </Page>
  );
};

const useStyles = makeStyles(theme =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    root: {
      minHeight: '100%',
      paddingTop: theme.spacing(3),
      paddingBottom: 100,
    },
  }),
);

export default ProductListView;
