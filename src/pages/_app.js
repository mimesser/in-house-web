import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';

import createStore from '../store';
import theme from '../theme';
import GlobalStyle from '../components/GlobalStyle';

class MyApp extends App {
   static async getInitialProps({ Component, ctx }) {
      let pageProps = {};

      if (Component.getInitialProps) {
         pageProps = await Component.getInitialProps({ ctx });
      }

      return { pageProps };
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