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

    store.dispatch(loadAggregateData(isServer, pathname));
    if (ctx.req) {
      store.dispatch(END);
      await ctx.store.sagaTask.toPromise();
    }

    return { pageProps, isServer: ctx.isServer, pathname: ctx.pathname, asPath: ctx.asPath, store };
  }

  componentDidMount() {
    initGA();
    logPageView();
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
