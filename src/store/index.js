import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducer';
import rootSaga from './saga';
import demoMiddleware from './demo/middleware';

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, demoMiddleware];
  const store = createStore(rootReducer, initialState, bindMiddleware(middlewares));

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
}

export default configureStore;
