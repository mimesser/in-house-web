import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import axios from 'axios';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';

import createStore from '../store';
import { theme } from '../style';
import { GlobalStyle } from '../components/GlobalStyle';
import { loadAggregateData } from '../store/aggregate';
import { initGA, logPageView } from '../utils/analytics';

const LAST_RELOAD_KEY = 'in-house/lastReload';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps({ ctx }) : {};
    return { pageProps, isServer: ctx.isServer, pathname: ctx.pathname, asPath: ctx.asPath };
  }

  forceRefresh = () => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    const lastReload = parseInt(localStorage.getItem(LAST_RELOAD_KEY) || '0');
    const now = new Date().getTime();
    if (
      isSafari &&
      now - lastReload > 60 * 1000 // Prevent infinite reloading.
    ) {
      console.log(`# page refresh FORCED on safari: ${isSafari}`);
      localStorage.setItem('lastReload', now);
      window.location.reload(true); // force page reload
    }
  };

  componentDidMount() {
    const { isServer, pathname } = this.props;
    this.props.store.dispatch(loadAggregateData(isServer, pathname));

    initGA();
    logPageView();

    window.onbeforeunload = this.forceRefresh;
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <>
              <GlobalStyle />
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <Component {...pageProps} />
            </>
          </ThemeProvider>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(createStore)(withReduxSaga(MyApp));
