import React from 'react';
import { makeStyles } from '@material-ui/core';

const Header = () => {
  const classes = useStyles();

  return <h1>Header works!</h1>;
};

const useStyles = makeStyles(() => ({}));

export default Header;
