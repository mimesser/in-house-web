import React from 'react';
import { storiesOf } from '@storybook/react';
import Stepper from './index';

storiesOf('Stepper', module)
  .add('light variant', () => (
    <div style={{ padding: 10, backgroundColor: '#333333' }}>
      <Stepper state={{ step: 1, total: 5 }} />
    </div>
  ))
  .add('dark variant', () => (
    <div style={{ padding: 10, backgroundColor: '#ffffff' }}>
      <Stepper state={{ step: 4, total: 8 }} variant="dark" />
    </div>
  ))
