import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { RootState } from 'store/reducers';
import HeaderProfile from 'app/components/header-profile';

import {
  AppBar,
  Toolbar,
  Button,
  useMediaQuery,
  colors,
} from '@material-ui/core';

export default function NavigationBar() {
  const classes = useStyles();
  const { claims } = useSelector((state: RootState) => state.auth);
  const mobileDevice = useMediaQuery('(max-width:650px)');

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link className={`${classes.link} ${classes.title}`} to={'/'}>
            {!mobileDevice && 'LOGO'}
          </Link>

          <Button className={classes.menuButton} color="inherit">
            <Link className={classes.link} to={'/'}>
              Home
            </Link>
          </Button>
          <Button className={classes.menuButton} color="inherit">
            <Link className={classes.link} to={'/about'}>
              About
            </Link>
          </Button>
          {claims ? (
            <>
              <Button className={classes.menuButton} color="inherit">
                <Link className={classes.link} to={'/dashboard'}>
                  Dashboard
                </Link>
              </Button>
              <HeaderProfile />
            </>
          ) : (
            <Button className={classes.menuButton} color="inherit">
              <Link className={classes.link} to={'/login'}>
                Login
              </Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    link: {
      color: colors.lightBlue[50],
      textDecoration: 'none',
    },
  }),
);
