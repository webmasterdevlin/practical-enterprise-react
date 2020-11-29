import { Grid } from '@material-ui/core';
import React from 'react';
import DashboardSidebarNavigation from '../../layouts/dashboard-layout/dashboard-sidebar-navigation';

type Props = {
  children: React.ReactNode;
};

const Dashboard = ({ children }: Props) => {
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

export default Dashboard;
