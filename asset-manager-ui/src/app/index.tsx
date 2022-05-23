/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { AssetsList } from './pages/AssetsList/Loadable';

import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import Container from '@mui/material/Container';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Container fixed>
        <Helmet
          titleTemplate="%s - Asset Manager"
          defaultTitle="Asset Manager"
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta name="description" content="An Asset Manager Application" />
        </Helmet>

        <Switch>
          <Route exact path="/" component={AssetsList} />
          <Route component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </Container>
    </BrowserRouter>
  );
}
