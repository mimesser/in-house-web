import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import { Tip } from './index';

const Container = styled.div`
  padding-top: ${(props) => props.paddingTop};
  padding-left: ${(props) => props.paddingLeft};
`;

storiesOf('Tip', module)
  .add('Top tooltip', () => (
    <Container paddingTop="50px">
      <Tip tooltip="asdasdasda!" placement="top-start">
        <button>Top tooltip</button>
      </Tip>
    </Container>
  ))
  .add('Bottom tooltip', () => (
    <Container>
      <Tip tooltip="asdasdasda!" placement="bottom">
        <button>Bottom tooltip</button>
      </Tip>
    </Container>
  ))
  .add('Right tooltip', () => (
    <Container>
      <Tip tooltip="asdasdasda!" placement="right">
        <button>Right tooltip</button>
      </Tip>
    </Container>
  ))
  .add('Left tooltip', () => (
    <Container paddingLeft="100px">
      <Tip tooltip="asdasdasda!" placement="left">
        <button>Left tooltip</button>
      </Tip>
    </Container>
  ));
