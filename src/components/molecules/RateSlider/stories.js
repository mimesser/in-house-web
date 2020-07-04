import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import { RateSlider } from './index';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const log = (value) => console.log(value);

storiesOf('RateSlider', module)
  .add('default', () => (
    <Container>
      <RateSlider onChange={log} value={7.6} userRate={6.1} />
    </Container>
  ))
  .add('no value (animate)', () => (
    <Container>
      <RateSlider onChange={log} value={undefined} readonly />
    </Container>
  ))
  .add('rated', () => (
    <Container>
      <RateSlider onChange={log} value={5.4} userRate={6.1} />
    </Container>
  ))
  .add('rate in progress', () => (
    <Container>
      <RateSlider onChange={log} value={6.7} expanded />
    </Container>
  ));
