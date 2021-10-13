import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import { Slider } from '.';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  ${Slider} {
    padding: 0px;
  }
`;

const log = (value) => console.log(value);

storiesOf('Slider', module)
  .add('default', () => (
    <Container>
      <Slider onChange={log} initialValue={9.3} />
    </Container>
  ))

  .add('disabled', () => (
    <Container>
      <Slider onChange={log} initialValue={null} disabled />
    </Container>
  ));
