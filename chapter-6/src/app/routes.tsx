import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';

import Dashboard from './layouts/dashboard-layout';
import HomePage from './views/pages/HomePage';
import NotFoundPage from './views/pages/NotFoundPage';

export const Routes = () => {
  return (
    <Suspense fallback={<LinearProgress style={{ margin: '10rem' }} />}>
      <Switch>
        {/*eager loading*/}
        <Route exact path={'/'} component={HomePage} />
        {/*lazy loadings*/}
        <Route
          exact
          path={'/about'}
          component={lazy(() => import('./views/pages/AboutPage'))}
        />
        <Route
          path={'/dashboard'}
          render={({ match: { path } }) => (
            <Dashboard>
              <Switch>
                <Route
                  exact
                  path={path + '/'}
                  component={lazy(
                    () => import('./views/dashboard/dashboard-default-content'),
                  )}
                />
                <Route
                  exact
                  path={path + '/settings-and-privacy'}
                  component={lazy(
                    () => import('./views/dashboard/settings-and-privacy'),
                  )}
                />
                <Route exact from={path + '/*'} to={path} />
              </Switch>
            </Dashboard>
          )}
        />
        {/*eager loading*/}
        <Route path={'/not-found'} component={NotFoundPage} />
        <Redirect exact from={'*'} to={'/not-found'} />
      </Switch>
    </Suspense>
  );
};
