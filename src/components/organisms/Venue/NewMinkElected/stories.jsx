import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import { NewMinkElected } from '.';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  > * {
    margin-bottom: 1rem;
  }
`;

storiesOf('NewMinkElected', module).add('initial', () => (
  <Container>
    <NewMinkElected open />
  </Container>
));
