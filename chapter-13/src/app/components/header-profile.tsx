import React from 'react';
import clsx from 'clsx';
import { Theme, withStyles } from '@material-ui/core/styles';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import { LogOut as LogOutIcon, Hexagon as HexagonIcon } from 'react-feather';
import { useSelector } from 'react-redux';
import { RootState } from 'store/reducers';
import { createStyles } from '@material-ui/styles';
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  makeStyles,
  MenuItem,
} from '@material-ui/core';

const HeaderProfile = () => {
  const classes = useStyles();

  const { profile } = useSelector((state: RootState) => state.profile);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <div>
      <Box display="flex" justifyContent="center" onClick={handleClick}>
        <Avatar
          variant={'circle'}
          alt="User"
          className={clsx(classes.avatar, classes.small)}
          src={profile.avatar}
        />
      </Box>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <ListItemText primary={profile.email} />
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <HexagonIcon />
          </ListItemIcon>
          <ListItemText primary="Partners" />
        </MenuItem>
        <a className={classes.link} href={'/'}>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogOutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
        </a>
      </StyledMenu>
    </div>
  );
};

export default HeaderProfile;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      cursor: 'pointer',
      width: 64,
      height: 64,
    },
    link: { textDecoration: 'none', color: 'inherit' },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
  }),
);

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));
