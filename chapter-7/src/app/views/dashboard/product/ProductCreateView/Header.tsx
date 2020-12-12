import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {
  Breadcrumbs,
  Button,
  Grid,
  Link,
  Typography,
  makeStyles,
  Box,
} from '@material-ui/core';

type Props = {
  className?: string;
};

const Header = ({ className, ...rest }: Props) => {
  const classes = useStyles();

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      justify="space-between"
      spacing={3}
      {...rest}
    >
      <Grid item>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            variant="body1"
            color="inherit"
            to="/dashboard"
            component={RouterLink}
          >
            Dashboard
          </Link>
          <Box mb={3}>
            <Typography variant="body1" color="inherit">
              Create Product
            </Typography>
          </Box>
        </Breadcrumbs>
        <Typography variant="h4" color="textPrimary">
          Create a new product
        </Typography>
      </Grid>
      <Grid item>
        <Button component={RouterLink} to="/dashboard/list-products">
          Cancel
        </Button>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles(() => ({
  root: {},
}));

export default Header;
