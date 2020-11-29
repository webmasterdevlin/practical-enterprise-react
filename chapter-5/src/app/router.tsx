import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Dashboard } from './views/dashboard';
import DashboardDefaultContent from './views/dashboard/dashboard-default-content';
import { AboutPage } from './views/pages/AboutPage';
import { HomePage } from './views/pages/HomePage';
import { NotFoundPage } from './views/pages/NotFoundPage';

export const Router = () => {
  return (
    <Switch>
      <Route path={'/'} component={HomePage} exact />
      <Route path={'/about'} component={AboutPage} />
      <Route
        path={'/dashboard'}
        render={({ match: { path } }) => (
          <Dashboard>
            <Switch>
              <Route
                exact
                path={path + '/'}
                component={DashboardDefaultContent}
              />
              <Route exact from={path + '/*'} to={path} />
            </Switch>
          </Dashboard>
        )}
      />
      <Route path={'/not-found'} component={NotFoundPage} />
      <Redirect exact from={'*'} to={'/not-found'} />
    </Switch>
  );
};
