import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
  Typography,
  makeStyles,
} from '@material-ui/core';

import { UserType } from 'models/user-type';

type Props = {
  className?: string;
  user: UserType;
};

const ProfileDetails = ({ className, user, ...rest }: Props) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          textAlign="center"
        >
          <Avatar className={classes.avatar} src={user?.avatar} />
          <Typography
            className={classes?.name}
            color="textPrimary"
            gutterBottom
            variant="h4"
          >
            {user?.name}
          </Typography>
          <Typography color="textPrimary" variant="body1">
            Your tier:{' '}
            <Link component={RouterLink} to="/pricing">
              {user?.tier}
            </Link>
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button fullWidth variant="text">
          Remove picture
        </Button>
      </CardActions>
    </Card>
  );
};

const useStyles = makeStyles(theme => ({
  root: {},
  name: {
    marginTop: theme.spacing(1),
  },
  avatar: {
    height: 100,
    width: 100,
  },
}));

export default ProfileDetails;
