import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Page } from '../components/organisms';
import { BackButton } from '../components/molecules';
import { Main, Commands } from '../components/molecules/Wizard';
import { Break, H1, Button } from '../components/atoms';

const Paper = styled(Page)`
  margin-right: auto;
  max-width: 750px;
  padding-top: 97px;
`;
const ActionButton = styled(Button)`
  margin-left: auto;
`;
// THESE ARE THE STYLES I ADDED - (Mari)
const Underline = styled.span`
  text-decoration:underline;
`;
const HorizontalBreak = styled(Break)`
  margin-top:0;
  margin-bottom:3.5em;
`;
const Description = styled.p``
// /////////////////////////////////////
function BetaList() {
  return (
    <>
      <Paper defaultHeader={false} title="In-House - List your House | Speak as a Team | Remain Untraceable">
        <Main>
          <H1>essential?</H1>
          <HorizontalBreak />
          <Description>until we scale, the platform is only available to essential or otherwise distressed workers as well as <Underline>hero organizations</Underline> who embrace holistic change</Description>
        </Main>
        <Commands>
          <Link href="/houses" passHref>
            <BackButton secondary>cancel</BackButton>
          </Link>
          <Link href="/feedback?subjectIndex=2&redirect=/houses">
            <ActionButton icon="arrow-right">be a hero</ActionButton>
          </Link>
        </Commands>
      </Paper>
    </>
  );
}
export default BetaList;