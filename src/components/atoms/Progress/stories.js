import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import { Progress } from '.';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem;
  > * {
    margin-bottom: 1rem;
  }
`;

storiesOf('Progress', module).add('Progress', () => (
  <Container>
    <Progress step={1} totalSteps={5} />
    <Progress step={3} totalSteps={5} />
    <Progress step={5} totalSteps={5} />
  </Container>
));
