import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import * as Sentry from '@sentry/nextjs';

import rootReducer from './reducer';
import rootSaga from './saga';
import demoMiddleware from './demo/middleware';

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware({
    onError: (error, { sagaStack }) => {
      Sentry.captureException(error, sagaStack);
    },
  });
  const middlewares = [sagaMiddleware, demoMiddleware];
  const store = createStore(rootReducer, initialState, bindMiddleware(middlewares));

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
}

export const makeStore = (context, initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(rootReducer, initialState, bindMiddleware([sagaMiddleware]));

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper(makeStore, { debug: false });
