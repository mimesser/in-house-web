import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import Bowser from 'bowser';
import Router from 'next/router';

import createStore from '../store';
import { theme } from '../style';
import GlobalStyle from '../components/GlobalStyle';
import { loadAggregateData } from '../store/aggregate';
import { ONBOARDING_PATHS_REGEX } from '../settings';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const desktop = Bowser.getParser(
      (ctx && ctx.req && ctx.req.headers['user-agent']) || window.navigator.userAgent,
    ).is('desktop');
    const pageProps = Component.getInitialProps ? await Component.getInitialProps({ ctx }) : {};
    return { pageProps, isServer: ctx.isServer, pathname: ctx.pathname, asPath: ctx.asPath, desktop };
  }

  handleRouteChangeStart = path => {
    const isOnboardingPath = ONBOARDING_PATHS_REGEX.test(path);

    const body = document.querySelector('body');
    if (isOnboardingPath) {
      body.classList.remove('hide-hotjar');
    } else {
      body.classList.add('hide-hotjar');
    }
  };

  componentDidMount() {
    const { isServer, pathname, asPath } = this.props;
    this.props.store.dispatch(loadAggregateData(isServer, pathname));
    this.handleRouteChangeStart(asPath);
    Router.events.on('routeChangeStart', this.handleRouteChangeStart);
  }

  render() {
    const { Component, pageProps, store, desktop } = this.props;
    theme.desktop = desktop;

    return (
      <Container>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <>
              <GlobalStyle />
              <Component {...pageProps} />
            </>
          </ThemeProvider>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(createStore)(withReduxSaga(MyApp));
