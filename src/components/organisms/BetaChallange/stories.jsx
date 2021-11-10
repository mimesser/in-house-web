import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import { BetaChallange } from '.';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  > * {
    margin-bottom: 1rem;
  }
`;

storiesOf('BetaChallange', module)
  .add('initial', () => (
    <Container>
      <BetaChallange showPopup wrongAnswer isAuthorizedBetaUser={false} />
    </Container>
  ))
  .add('incorrect', () => (
    <Container>
      <BetaChallange showPopup wrongAnswer isAuthorizedBetaUser={false} showError />
    </Container>
  ))
  .add('correct', () => (
    <Container>
      <BetaChallange showPopup wrongAnswer={false} isAuthorizedBetaUser={false} />
    </Container>
  ));
