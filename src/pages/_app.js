import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import axios from 'axios';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { END } from 'redux-saga';
import { Helmet } from 'react-helmet';
import { wrapper } from '../store';
import { theme } from '../style';
import { GlobalStyle } from '../components/GlobalStyle';
import { loadAggregateData } from '../store/aggregate';
import { initGA, logPageView } from '../utils/analytics';

const LAST_RELOAD_KEY = 'in-house/lastReload';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = {
      ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
    };

    if (ctx.req) {
      ctx.store.dispatch(END);
      await ctx.store.sagaTask.toPromise();
    }
    return { ...pageProps, store: ctx.store };
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

export default wrapper.withRedux(MyApp);
