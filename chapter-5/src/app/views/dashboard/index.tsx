import { Grid } from '@material-ui/core';
import React from 'react';
import DashboardSidebarNavigation from '../components/dashboard-sidebar-navigation';

type Props = {
  children: React.ReactNode;
};

export const Dashboard = ({ children }: Props) => {
  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      <DashboardSidebarNavigation /> {children}
    </Grid>
  );
};
