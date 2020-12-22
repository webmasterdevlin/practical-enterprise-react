import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useRouteMatch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  Box,
  Collapse,
  Divider,
  ListSubheader,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import {
  PieChart as PieChartIcon,
  ShoppingCart as ShoppingCartIcon,
  ChevronUp as ChevronUpIcon,
  ChevronDown as ChevronDownIcon,
  List as ListIcon,
  FilePlus as FilePlusIcon,
  Calendar as CalendarIcon,
  User as UserIcon,
  DollarSign as DollarSignIcon,
  LogOut as LogOutIcon,
} from 'react-feather';

import { RootState } from 'store/reducers';
import { getProfileAction } from 'features/profile/profileAsyncActions';
import clsx from 'clsx';

const DashboardSidebarNavigation = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { profile } = useSelector((state: RootState) => state.profile);
  const { claims } = useSelector((state: RootState) => state.auth);
  const [open, setOpen] = useState(false);
  const { url } = useRouteMatch();
  const mobileDevice = useMediaQuery('(max-width:650px)');

  useEffect(() => {
    dispatch(getProfileAction(claims.sub));
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <>
      <div className={classes.root}>
        <Drawer
          className={clsx(classes.drawer, mobileDevice && classes.drawerClose)}
          variant="permanent"
          classes={{
            paper: clsx(
              classes.drawerPaper,
              mobileDevice && classes.drawerClose,
            ),
          }}
          anchor="left"
        >
          {profile.name && !mobileDevice && (
            <Box p={2}>
              <Box display="flex" justifyContent="center">
                <Avatar
                  alt="User"
                  className={classes.avatar}
                  src={profile.avatar}
                />
              </Box>
              <Box mt={2} textAlign="center">
                <Typography>{profile.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Your tier: {profile.tier}
                </Typography>
              </Box>
            </Box>
          )}
          <Divider />
          {mobileDevice ? (
            <div className={classes.drawerContainer}>
              <List>
                <Link className={classes.link} to={`${url}`}>
                  <ListItem button>
                    <ListItemIcon>
                      <PieChartIcon />
                    </ListItemIcon>
                  </ListItem>
                </Link>
                <Divider />
                <ListItem button onClick={handleClick}>
                  <ListItemIcon>
                    <ShoppingCartIcon />
                  </ListItemIcon>
                  {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </ListItem>
                <Divider />
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Link className={classes.link} to={`${url}/list-products`}>
                      <ListItem button className={classes.nested}>
                        <ListItemIcon>
                          <ListIcon />
                        </ListItemIcon>
                      </ListItem>
                    </Link>
                    <Link className={classes.link} to={`${url}/create-product`}>
                      <ListItem button className={classes.nested}>
                        <ListItemIcon>
                          <FilePlusIcon />
                        </ListItemIcon>
                      </ListItem>
                    </Link>
                  </List>
                </Collapse>
                <Divider />
                <Link className={classes.link} to={`${url}/calendar`}>
                  <ListItem button>
                    <ListItemIcon>
                      <CalendarIcon />
                    </ListItemIcon>
                  </ListItem>
                </Link>
                <Divider />
                <Link className={classes.link} to={`${url}/account`}>
                  <ListItem button>
                    <ListItemIcon>
                      <UserIcon />
                    </ListItemIcon>
                  </ListItem>
                </Link>
                <Divider />
                <Link className={classes.link} to={`/pricing`}>
                  <ListItem button>
                    <ListItemIcon>
                      <DollarSignIcon />
                    </ListItemIcon>
                  </ListItem>
                </Link>
                <Divider />
                <a className={classes.link} href={'/'}>
                  <ListItem button onClick={handleLogout}>
                    <ListItemIcon>
                      <LogOutIcon />
                    </ListItemIcon>
                  </ListItem>
                </a>
              </List>
              <Divider />
            </div>
          ) : (
            <div className={classes.drawerContainer}>
              <List>
                <ListSubheader>Reports</ListSubheader>
                <Link className={classes.link} to={`${url}`}>
                  <ListItem button>
                    <ListItemIcon>
                      <PieChartIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Dashboard'} />
                  </ListItem>
                </Link>

                <ListSubheader>Management</ListSubheader>
                <ListItem button onClick={handleClick}>
                  <ListItemIcon>
                    <ShoppingCartIcon />
                  </ListItemIcon>
                  <ListItemText primary="Products" />
                  {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Link className={classes.link} to={`${url}/list-products`}>
                      <ListItem button className={classes.nested}>
                        <ListItemIcon>
                          <ListIcon />
                        </ListItemIcon>
                        <ListItemText primary="List Products" />
                      </ListItem>
                    </Link>
                    <Link className={classes.link} to={`${url}/create-product`}>
                      <ListItem button className={classes.nested}>
                        <ListItemIcon>
                          <FilePlusIcon />
                        </ListItemIcon>
                        <ListItemText primary="Create Product" />
                      </ListItem>
                    </Link>
                  </List>
                </Collapse>

                <ListSubheader>Applications</ListSubheader>
                <Link className={classes.link} to={`${url}/calendar`}>
                  <ListItem button>
                    <ListItemIcon>
                      <CalendarIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Calendar'} />
                  </ListItem>
                </Link>

                <ListSubheader>Pages</ListSubheader>
                <Link className={classes.link} to={`${url}/account`}>
                  <ListItem button>
                    <ListItemIcon>
                      <UserIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Account'} />
                  </ListItem>
                </Link>
                <Link className={classes.link} to={`/pricing`}>
                  <ListItem button>
                    <ListItemIcon>
                      <DollarSignIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Pricing'} />
                  </ListItem>
                </Link>

                <a className={classes.link} href={'/'}>
                  <ListItem button onClick={handleLogout}>
                    <ListItemIcon>
                      <LogOutIcon />
                    </ListItemIcon>
                    <ListItemText primary={'logout'} />
                  </ListItem>
                </a>
              </List>
            </div>
          )}
        </Drawer>
      </div>
    </>
  );
};

export default DashboardSidebarNavigation;

const drawerWidth = 240;

const useStyles = makeStyles(theme =>
  createStyles({
    avatar: {
      cursor: 'pointer',
      width: 64,
      height: 64,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    drawerPaper: {
      width: drawerWidth,
    },
    link: { textDecoration: 'none', color: 'inherit' },
    logoWithLink: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      color: 'inherit',
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    root: {
      display: 'flex',
    },
    toolbar: theme.mixins.toolbar,

    // mobile style
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
  }),
);
