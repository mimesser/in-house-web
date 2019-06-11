import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import configureStore from '../../src/store';
import theme from '../../src/theme';

const store = configureStore();
const req = require.context('../../src/components', true, /.stories.js$/);

function loadStories() {
   req.keys().forEach(filename => req(filename));
}

addDecorator(story => (
   <Provider store={store}>
      <ThemeProvider theme={theme}>{story()}</ThemeProvider>
   </Provider>
));

configure(loadStories, module);
