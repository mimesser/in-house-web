/* global localStorage */

/**
 * Create the store with dynamic reducers
 */
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { LOCAL_STORAGE_KEY } from 'config';
// eslint-disable-next-line
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';

let store;

export default function configureStore() {
   const middleware = [
      thunkMiddleware,
   ];

   let noLocalStorage = true;

   const cachedState = (() => {
      try {
         const data = localStorage.getItem(LOCAL_STORAGE_KEY);
         noLocalStorage = false;
         return JSON.parse(data);
      } catch (err) {
         return null;
      }
   })();

   const state = (() => {
      if (noLocalStorage) {
         return { noLocalStorage: true };
      }
      return { ...cachedState, booting: true };
   })();

   store = createStore(
      reducer,
      state,
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
      // eslint-disable-next-line no-console
      console.warn('For some strange reason, dispatch was called before store was initialized.');
   };
}

export function getState() {
   return store.getState();
}
