import App from 'next/app';
import Head from 'next/head';
import { END } from 'redux-saga';
import { ThemeProvider } from 'styled-components';
import { hotjar } from 'react-hotjar';

import { wrapper } from '../store';
import { theme } from '../style';
import { GlobalStyle } from '../components/GlobalStyle';
import { initGA, logPageView } from '../utils/analytics';
import { VersionFlag } from '../components/atoms';

class MyApp extends App {
  static async getInitialProps({ Component, ctx, store }) {
    // 1. Wait for all page actions to dispatch
    const pageProps = {
      ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
    };

    // 2. Stop the saga if on server
    if (ctx.isServer) {
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }

    // 3. Return props
    return {
      pageProps,
    };
  }

  componentDidMount() {
    hotjar.initialize(process.env.NEXT_PUBLIC_HOTJAR_SITE_ID, 6);
    initGA();
    logPageView();
  }

  componentDidUpdate() {
    logPageView();
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
        </Head>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
          {['development', 'staging'].indexOf(process.env.NEXT_PUBLIC_ENVIRONMENT.toLowerCase()) !==
            -1 && <VersionFlag />}
        </ThemeProvider>
      </>
    );
  }
}

export default wrapper.withRedux(MyApp);
