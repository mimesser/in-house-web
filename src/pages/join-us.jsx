import React from 'react';
import styled from 'styled-components';

import { Page } from '../components/organisms';
import { H1 } from '../components/atoms';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  text-transform: none;
  align-items: center;
`;

function JoinUs() {
  return (
    <Page noPadd>
      <Wrapper>
        <H1>Coming Soon...</H1>
      </Wrapper>
    </Page>
  );
}

export default JoinUs;
