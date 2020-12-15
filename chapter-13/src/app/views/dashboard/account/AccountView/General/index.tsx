import React from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { Grid, makeStyles } from '@material-ui/core';

import ProfileDetails from './ProfileDetails';
import GeneralSettings from './GeneralSettings';
import { RootState } from 'store/reducers';

type Props = {
  className?: string;
};

const General = ({ className, ...rest }: Props) => {
  const classes = useStyles();
  const { profile } = useSelector((state: RootState) => state.profile);

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      spacing={3}
      {...rest}
    >
      <Grid item lg={4} md={6} xl={3} xs={12}>
        <ProfileDetails user={profile} />
      </Grid>
      <Grid item lg={8} md={6} xl={9} xs={12}>
        <GeneralSettings user={profile} />
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles(() => ({
  root: {},
}));

export default General;
