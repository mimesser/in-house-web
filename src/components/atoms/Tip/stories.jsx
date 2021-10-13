import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import { Tip } from '.';

const Container = styled.div``;

storiesOf('Tip', module).add('Button', () => (
  <Container>
    <Tip tooltip="asdasdasda!" placement="bottom">
      <span>asdasdasda</span>
    </Tip>
    <Tip tooltip="Hello, World!">
      <button>foo</button>
    </Tip>
    <div>
      <Tip tooltip="Yoo!">
        <div>dasdasda</div>
      </Tip>
    </div>
  </Container>
));
