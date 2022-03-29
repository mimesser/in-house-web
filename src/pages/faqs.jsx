import React from 'react';
import styled from 'styled-components';

import { Page } from '../components/organisms';
import { H1 } from '../components/atoms';
import { Footer } from '../components/organisms/Footer';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  text-transform: none;
  align-items: center;
  margin: auto;
`;

function Faqs() {
  return (
    <Page noPadd variant="dark">
      <Wrapper>
        <H1>Coming Soon...</H1>
      </Wrapper>
      <Footer style={{botom: 0, position: 'absolute' }} variant="transparent" />
    </Page>
  );
}

export default Faqs;
