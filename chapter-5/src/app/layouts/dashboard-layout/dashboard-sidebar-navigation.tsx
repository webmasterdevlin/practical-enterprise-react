import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Toolbar from '@material-ui/core/Toolbar';
import { useRouteMatch } from 'react-router';

const DashboardSidebarNavigation = () => {
  const classes = useStyles();
  const { url } = useRouteMatch();

  useEffect(() => {}, []);

  return (
    <>
      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <Toolbar
            style={{ width: '6rem', height: 'auto' }}
            className={classes.toolbar}
          >
            <Link to={`${url}`} className={classes.logoWithLink}>
              Logo
            </Link>
          </Toolbar>
          <div className={classes.drawerContainer}>
            <List>
              <Link className={classes.link} to={`${url}/settings-and-privacy`}>
                <ListItem button>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary={'settings and privacy'} />
                </ListItem>
              </Link>
              <a className={classes.link} href={'/'}>
                <ListItem button>
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary={'logout'} />
                </ListItem>
              </a>
            </List>
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default DashboardSidebarNavigation;

const drawerWidth = 240;

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    link: { textDecoration: 'none', color: 'inherit' },
    logoWithLink: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      color: 'inherit',
    },
  }),
);
