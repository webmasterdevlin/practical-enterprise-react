/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { Container } from '@material-ui/core';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from 'styles/global-styles';

import NavigationBar from './views/components/navigation-bar';
import { Routes } from './routes';

export function App() {
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>
      <NavigationBar />
      <Container>
        <Routes />
      </Container>
      <GlobalStyle />
    </BrowserRouter>
  );
}
