import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import { WelcomePopup } from '.';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  > * {
    margin-bottom: 1rem;
  }
`;

storiesOf('WelcomePopup', module).add('initial', () => (
  <Container>
    <WelcomePopup />
  </Container>
));
