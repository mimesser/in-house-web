import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import { RateSlider } from './index';
import { spacing } from '../../../style';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-bottom: ${spacing.md};
  flex-shrink: 0; // safari
  flex-basis: auto; // safari
`;

const log = (value) => console.log(value);

storiesOf('RateSlider', module)
  .add('default', () => (
    <Container>
      <RateSlider onChange={log} value={7.6} userRate={6.1} />
      <RateSlider onChange={log} value={undefined} />

      <RateSlider onChange={log} value={5.4} userRate={6.1} />
      <RateSlider onChange={log} value={5.1} userRate={6.1} />
      <RateSlider onChange={log} value={6.4} userRate={6.1} />
      <RateSlider onChange={log} value={7.4} userRate={6.1} />
      <RateSlider onChange={log} value={8.4} userRate={6.1} />
    </Container>
  ))
  .add('no value (animate)', () => (
    <Container>
      <RateSlider onChange={log} value={undefined} />
    </Container>
  ))
  .add('not rated (animate)', () => (
    <Container>
      <RateSlider onChange={log} value={8.9} userRate={undefined} voteCount={43} />
    </Container>
  ))
  .add('rated', () => (
    <Container>
      <RateSlider onChange={log} value={5.4} userRate={6.1} />
    </Container>
  ))
  .add('rate in progress', () => (
    <Container>
      <RateSlider onChange={log} value={6.7} expanded userRate={6.1} />
    </Container>
  ));
