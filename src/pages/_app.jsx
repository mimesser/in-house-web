import { ThemeProvider } from 'styled-components';
import App from 'next/app';
import Head from 'next/head';
import { Helmet } from 'react-helmet';
import { useRouter } from 'next/router';
import { hotjar } from 'react-hotjar';
import { VersionFlag } from '../components/atoms';
import { wrapper } from '../store';
import { theme } from '../style';
import { GlobalStyle } from '../components/GlobalStyle';
import { initGA, logPageView } from '../utils/analytics';

class MyApp extends App {
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
