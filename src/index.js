/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from 'store';
import theme from 'styling/theme';
import 'styling/global';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
   <Provider store={store}>
      <ThemeProvider theme={theme}>
         <App />
      </ThemeProvider>
   </Provider>,
   document.getElementById('root'),
);

registerServiceWorker();
