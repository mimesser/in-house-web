import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';

import createStore from '../store';
import { theme } from '../style';
import { settings } from '../settings';
import GlobalStyle from '../components/GlobalStyle';
import { loadAggregateData } from '../store/aggregate';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps({ ctx }) : {};
    return { pageProps, isServer: ctx.isServer, pathname: ctx.pathname };
  }

  componentDidMount() {
    if (settings.preLaunchMode) {
      return;
    }

    const { isServer, pathname } = this.props;
    this.props.store.dispatch(loadAggregateData(isServer, pathname));
  }

  render() {
    const { Component, pageProps, store } = this.props;

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
