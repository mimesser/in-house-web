import React from 'react';
import { storiesOf } from '@storybook/react';
import { Checkbox } from '.';

storiesOf('Checkbox', module)
  .add('Checkbox', () => <Checkbox>check check</Checkbox>)
  .add('Checkbox Marked', () => <Checkbox checked />);
