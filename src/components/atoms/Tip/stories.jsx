import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import { Tip } from './index';

const Container = styled.div`
  padding: 50px 60px;
`;

storiesOf('Tip', module).add('Button', () => (
  <Container>
    <Tip tooltip="asdasdasda!" placement="top-start">
      <button>Top tooltip</button>
    </Tip>
    <h2>Bottom</h2>
    <Tip tooltip="asdasdasda!" placement="bottom-end">
      <button>Bottom tooltip</button>
    </Tip>
    <h2>Right</h2>
    <Tip tooltip="asdasdasda!" placement="right">
      <button>Right tooltip</button>
    </Tip>

    <h2>Left</h2>
    <Tip tooltip="asdasdasda!" placement="right">
      <button>Left tooltip</button>
    </Tip>
  </Container>
));
