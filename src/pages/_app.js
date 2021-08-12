import React from 'react';
import { ThemeProvider } from 'styled-components';
import App from 'next/app';
import Head from 'next/head';
import { END } from 'redux-saga';
import { Helmet } from 'react-helmet';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { wrapper } from '../store';
import { theme } from '../style';
import { GlobalStyle } from '../components/GlobalStyle';
import { initGA, logPageView } from '../utils/analytics';

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

  componentDidUpdate() {
    logPageView();
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <>
          <Head>
            {/* <title>In-House | Speak as a Team | Remain Untraceable</title> */}
            {/* <meta name="title" content="In-House | Speak as a Team | Remain Untraceable" /> */}
            <meta
              name="description"
              content="Challenge favoritism and politics. Promote the best ideas and people. Are you an Insider?"
            />

            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://in-house.com/" />
            {/* <meta property="og:title" content="In-House | Speak as a Team | Remain Untraceable" /> */}
            <meta
              property="og:description"
              content="Challenge favoritism and politics. Promote the best ideas and people. Are you an Insider?"
            />
            <meta property="og:image" content="https://in-house.azureedge.net/webstatic/in-house-meta.png" />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="https://in-house.com/" />
            {/* <meta property="twitter:title" content="In-House | Speak as a Team | Remain Untraceable" /> */}
            <meta
              property="twitter:description"
              content="Challenge favoritism and politics. Promote the best ideas and people. Are you an Insider?"
            />
            <meta property="twitter:image" content="https://in-house.azureedge.net/webstatic/in-house-meta.png" />

            <meta name="theme-color" content="#333333" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            />
          </Head>

          <GlobalStyle />
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </>
      </ThemeProvider>
    );
  }
}

export default wrapper.withRedux(MyApp);
