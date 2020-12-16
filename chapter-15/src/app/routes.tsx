import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';

import Dashboard from './layouts/dashboard-layout';
import HomePage from './views/pages/HomePage';
import NotFoundPage from './views/pages/NotFoundPage';
import ProtectedRoute from './components/protected-route';

export const Routes = () => {
  return (
    <Suspense fallback={<LinearProgress style={{ margin: '10rem' }} />}>
      <Switch>
        {/*eager loading*/}
        <Route path={'/'} component={HomePage} exact />
        {/*lazy loadings*/}
        <Route
          path={'/about'}
          component={lazy(() => import('./views/pages/AboutPage'))}
          exact
        />
        <Route
          path={'/login'}
          component={lazy(() => import('./views/pages/auth/LoginPage'))}
          exact
        />
        <Route
          path={'/pricing'}
          component={lazy(() => import('./views/pages/pricing/PricingPage'))}
          exact
        />
        <ProtectedRoute
          path={'/dashboard'}
          render={({ match: { path } }) => (
            <Dashboard>
              <Switch>
                <Route
                  path={path + '/'}
                  component={lazy(
                    () => import('./views/dashboard/dashboard-default-content'),
                  )}
                  exact
                />
                <Route
                  path={path + '/list-products'}
                  component={lazy(
                    () => import('./views/dashboard/product/ProductListView'),
                  )}
                  exact
                />
                <Route
                  path={path + '/create-product'}
                  component={lazy(
                    () => import('./views/dashboard/product/ProductCreateView'),
                  )}
                  exact
                />
                <Route
                  path={path + '/calendar'}
                  component={lazy(
                    () => import('./views/dashboard/calendar/CalendarView'),
                  )}
                  exact
                />
                <Route
                  path={path + '/account'}
                  component={lazy(
                    () => import('./views/dashboard/account/AccountView'),
                  )}
                  exact
                />
              </Switch>
            </Dashboard>
          )}
        />
        {/*eager loading*/}
        <Route path={'/not-found'} component={NotFoundPage} exact />
        <Redirect from={'*'} to={'/not-found'} exact />
      </Switch>
    </Suspense>
  );
};
