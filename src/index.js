/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import configureStore from 'store';
import theme from 'styling/theme';
import 'styling/global';
import Main from 'main';
// import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

ReactDOM.render(
   <Provider store={store}>
      <ThemeProvider theme={theme}>
         <Main />
      </ThemeProvider>
   </Provider>,
   document.getElementById('root'),
);

// registerServiceWorker();
