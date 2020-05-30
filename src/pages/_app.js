import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import App from 'next/app';
import withRedux, { createWrapper } from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { END } from 'redux-saga';

import createStore from '../store';
import { theme } from '../style';
import { GlobalStyle } from '../components/GlobalStyle';
import { loadAggregateData } from '../store/aggregate';
import { initGA, logPageView } from '../utils/analytics';
import { Helmet } from 'react-helmet';

const LAST_RELOAD_KEY = 'in-house/lastReload';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = {
      ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
    };

    const { isServer, pathname, store } = ctx;

    if (ctx.req) {
      store.dispatch(END);
      await ctx.store.sagaTask.toPromise();
    }

    store.dispatch(loadAggregateData(isServer, pathname));

    return { pageProps, isServer: ctx.isServer, pathname: ctx.pathname, asPath: ctx.asPath, store };
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
    initGA();
    logPageView();

    window.onbeforeunload = this.forceRefresh;
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <>
          <Helmet>
            <link rel="canonical" href="'//hello.myfonts.net/count/3af918'" />
          </Helmet>
          <GlobalStyle />
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </>
      </ThemeProvider>
    );
  }
}
export default createWrapper(createStore).withRedux(MyApp);
