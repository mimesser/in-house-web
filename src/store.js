/* global window, localStorage */
import { createStore } from 'redux';

function reducer(state, action) {
   switch (action.type) {
      case 'SET': {
         return action.data;
      }
      default: {
         return state;
      }
   }
}

function getStoredData() {
   try {
      const data = JSON.parse(localStorage.getItem('in-house'));

      return data || {};
   } catch (err) {
      return {};
   }
}

export function getStore() {
   const data = getStoredData();

   const store = createStore(
      reducer,
      data,
      // eslint-disable-next-line no-underscore-dangle
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
   );

   if (localStorage) {
      store.subscribe(() => {
         localStorage.setItem('in-house', JSON.stringify(store.getState()));
      });
   }

   return store;
}

export function setData(data) {
   return { type: 'SET', data };
}
