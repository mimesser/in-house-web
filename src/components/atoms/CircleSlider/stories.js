import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import CircleSlider from '.';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  ${CircleSlider} {
    padding: 25px;
  }
`;

const log = value => console.log(value);

storiesOf('CircleSlider', module)
  .add('default', () => (
    <Container>
      <CircleSlider onChange={log} initialValue={9.3} />
    </Container>
  ))
  .add('no value (animate)', () => (
    <Container>
      <CircleSlider onChange={log} initialValue={undefined} />
    </Container>
  ))
  .add('readonly', () => (
    <Container>
      <CircleSlider onChange={log} initialValue={5.4} readonly />
    </Container>
  ))
  .add('readonly no value', () => (
    <Container>
      <CircleSlider onChange={log} initialValue={null} readonly />
    </Container>
  ));
