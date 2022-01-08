import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { Input, Textarea } from '.';

const Container = styled.div`
  > *,
  > div * {
    margin-bottom: 1rem;
  }
`;

storiesOf('Input controls', module)
  .add('Input', () => (
    <Container>
      <Input />
      <Input placeholder="placeholder" />
      <Input value="some value" />
      <Input value="disabled" disabled />
      <Input value="strike wrong" strike />
      <Input value="error" error />
      <div style={{ background: '#333333', padding: 10 }}>
        <Input variant="light" />
        <Input variant="light" placeholder="placeholder" />
        <Input variant="light" value="some value" />
        <Input variant="light" value="disabled" disabled /> variant="light
        <Input variant="light" value="strike wrong" strike />
        <Input variant="light" value="error" error />
      </div>
    </Container>
  ))
  .add('Textarea', () => (
    <Container>
      <Textarea />
      <div style={{ background: '#333333', padding: 10 }}>
        <Textarea variant="light" />
      </div>
    </Container>
  ));
