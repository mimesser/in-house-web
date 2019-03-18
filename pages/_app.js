import React from 'react'
import App, { Container } from 'next/app'
import { Provider } from 'react-redux'
import withReduxStore from '../lib/with-redux-store'
import Header from '../components/header';
import api, { setAuthorization } from '../api';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }


    return { pageProps }
  }

  async componentDidMount() {
    try {
      const cachedToken = localStorage.getItem('in-house/token');

      if (process.env.NODE_ENV !== 'development' || !this.props.reduxStore.getState().aggregate) {
        if (cachedToken) {
          setAuthorization(cachedToken);
        }

        const { data: aggregate } = await api.get('aggregate', { method: 'GET' });

        setAuthorization(aggregate.userId);

        this.props.reduxStore.dispatch(({ type: 'SET_AGGREGATE', aggregate }));
      }
    } catch(err) {
      // TODO:
      throw err;
    }
  }

  render () {
    const { Component, pageProps, reduxStore } = this.props

    return (
      <Container>
        <Provider store={reduxStore}>
          <Header />
            <main>
              <Component {...pageProps} />
            </main>

          <style jsx>{`
              main {
                padding: 20px;
              }
          `}
          </style>
         </Provider>
      </Container>
    )
  }
}

export default withReduxStore(MyApp);
