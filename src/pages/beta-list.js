import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Page } from '../components/organisms';
import { BackButton, NextButton } from '../components/molecules';

import { Main, Commands } from '../components/molecules/Wizard';
import { Break, H1 } from '../components/atoms';

const Paper = styled(Page)`
  margin-right: auto;
  max-width: 750px;
  padding-top: 97px;
`;
function BetaList() {
  return (
    <>
      <Paper defaultHeader={false} title="In-House - List your House | Speak as a Team | Remain Untraceable">
        <Main>
          <H1>your workspace?</H1>
          <Break />
          <>
            we will only be offering this platform to essential workforces during our beta trial. please contact us if
            you like to include yours
          </>
        </Main>
        <Commands>
          <Link href="/houses" passHref>
            <BackButton secondary>cancel</BackButton>
          </Link>
          <Link href="/feedback?subjectIndex=1">
            <NextButton> contact us</NextButton>
          </Link>
        </Commands>
      </Paper>
    </>
  );
}

export default BetaList;
