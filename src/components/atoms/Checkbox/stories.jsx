import React from 'react';
import { storiesOf } from '@storybook/react';
import { Checkbox } from '.';
import { Checkbox as NewCheckBox } from './_index';
import Text from '../text/_index';

storiesOf('Checkbox', module)
  .add('Checkbox', () => <Checkbox>check check</Checkbox>)
  .add('Checkbox Marked', () => <Checkbox checked />)
  .add('New Checkbox', () => (
    <div style={{ backgroundColor: '#333333', padding: 10 }}>
      <NewCheckBox>
        <Text>Testing</Text>
      </NewCheckBox>
    </div>
  ))
  .add('New Checkbox checked', () => (
    <NewCheckBox checked>
      <Text>Testing</Text>
    </NewCheckBox>
  ))
  .add('New Checkbox unchecked', () => (
    <NewCheckBox checked={false}>
      <Text>Testing</Text>
    </NewCheckBox>
  ));
