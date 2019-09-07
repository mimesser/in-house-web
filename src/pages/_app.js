import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import Bowser from 'bowser';

import createStore from '../store';
import { theme } from '../style';
import GlobalStyle from '../components/GlobalStyle';
import { loadAggregateData } from '../store/aggregate';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const desktop = Bowser.getParser(
      (ctx && ctx.req && ctx.req.headers['user-agent']) || window.navigator.userAgent,
    ).is('desktop');
    const pageProps = Component.getInitialProps ? await Component.getInitialProps({ ctx }) : {};
    return { pageProps, isServer: ctx.isServer, pathname: ctx.pathname, desktop };
  }

  componentDidMount() {
    const { isServer, pathname } = this.props;
    this.props.store.dispatch(loadAggregateData(isServer, pathname));
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
