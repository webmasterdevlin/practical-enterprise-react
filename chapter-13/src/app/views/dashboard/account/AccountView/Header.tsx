import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import {
  Typography,
  Breadcrumbs,
  Link,
  makeStyles,
  Box,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

type Props = {
  className?: string;
};

const Header = ({ className, ...rest }: Props) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link color="inherit" to="/app" component={RouterLink}>
          Dashboard
        </Link>
        <Box mb={3}>
          <Typography variant="body1" color="inherit">
            Account
          </Typography>
        </Box>
      </Breadcrumbs>
      <Typography variant="h4" color="textPrimary">
        Settings
      </Typography>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  root: {},
}));

export default Header;
