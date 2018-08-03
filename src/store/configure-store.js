/* global window, localStorage */

/**
 * Create the store with dynamic reducers
 */
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { LOCAL_STORAGE_KEY } from 'config';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';

let store;

export default function configureStore(initialState = {}) {
   const middleware = [
      thunkMiddleware,
   ];

   const cachedState = (() => {
      try {
         return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      } catch (err) {
         return null;
      }
   })();

   store = createStore(
      reducer,
      { ...cachedState, ...initialState },
      composeWithDevTools(applyMiddleware(...middleware)),
   );

   store.injectedReducers = {}; // Reducer registry

   store.subscribe(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store.getState()));
   });

   return store;
}

export function dispatch(func) {
   return store ? store.dispatch(func) : () => {
      console.warn('For some strange reason, dispatch was called before store was initialized.');
   };
}

export function getState() {
   return store.getState();
}
