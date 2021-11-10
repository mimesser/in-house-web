import React, { useState } from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import { CounterInput } from '.';

const Container = styled.div`
  padding: 1rem;
  > * {
    margin-bottom: 1rem;
  }
`;

const ControlledInput = ({ error }) => {
  const [value, setValue] = useState('');

  return (
    <CounterInput
      multiline
      value={value}
      subtext="subtext / etc"
      onChange={setValue}
      max={100}
      placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
      rows={4}
      error={error}
    />
  );
};

storiesOf('CounterInput', module).add('CounterInput', () => (
  <Container>
    <ControlledInput />
    <ControlledInput error="error blah" />
  </Container>
));
