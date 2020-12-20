import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Link,
  SvgIcon,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  PlusCircle as PlusCircleIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
} from 'react-feather';

type Props = {
  className?: string;
};

const Header = ({ className, ...rest }: Props) => {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={3}
      justify="space-between"
      className={clsx(classes.root, className)}
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
              List Products
            </Typography>
          </Box>
        </Breadcrumbs>
        <Typography variant="h4" color="textPrimary">
          All Products
        </Typography>
        <Box mt={2}>
          <Button
            className={classes.action}
            startIcon={
              <SvgIcon fontSize="small">
                <UploadIcon />
              </SvgIcon>
            }
          >
            Import
          </Button>
          <Button
            className={classes.action}
            startIcon={
              <SvgIcon fontSize="small">
                <DownloadIcon />
              </SvgIcon>
            }
          >
            Export
          </Button>
        </Box>
      </Grid>
      <Grid item>
        <Button
          color="primary"
          variant="contained"
          className={classes.action}
          component={RouterLink}
          to="/dashboard/create-product"
          startIcon={
            <SvgIcon fontSize="small">
              <PlusCircleIcon />
            </SvgIcon>
          }
        >
          New Product
        </Button>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles(theme => ({
  root: {},
  action: {
    marginBottom: theme.spacing(1),
    '& + &': {
      marginLeft: theme.spacing(1),
    },
  },
}));

export default Header;
