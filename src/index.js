/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { getStore } from 'store';
import 'styling/css/global.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
   <Provider store={getStore()}>
      <App />
   </Provider>,
   document.getElementById('root'),
);

registerServiceWorker();
