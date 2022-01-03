import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { configureStore } from '../../src/store';
import { theme } from '../../src/style';
import { GlobalStyle } from '../../src/components/GlobalStyle';
const store = configureStore();
const req = require.context('../../src/', true, /stories\.jsx$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

addDecorator((story) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        {story()}
      </>
    </ThemeProvider>
  </Provider>
));

configure(loadStories, module);
