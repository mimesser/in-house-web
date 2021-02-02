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
const Bold = styled.span`
  font-weight: bold;
`;
const HorizontalBreak = styled(Break)`
  margin-top: 0;
  margin-bottom: 3.5em;
`;
const Description = styled.p`
  ul {
    list-style-type: none;

    li:not(:last-child) {
      padding-bottom: 5px;
    }
  }
`;

function BetaList() {
  return (
    <>
      <Paper defaultHeader={false} title="In-House - List your House | Speak as a Team | Remain Untraceable">
        <Main>
          <H1>essential worker?</H1>
          <HorizontalBreak />
          <Description>
            during our beta trial, we will only be accepting requests from:
            <ul>
              <li>a) essential workers</li>
              <li>b) those experiencing abuse or mistreatment</li>
              <li>
                c) <Bold>hero organizations</Bold> open to holistic change
              </li>
            </ul>
          </Description>
        </Main>
        <Commands>
          <Link href="/houses" passHref>
            <BackButton secondary>cancel</BackButton>
          </Link>
          <Link href="/feedback?subjectIndex=2&redirect=/houses">
            <ActionButton icon="arrow-right">list your workplace</ActionButton>
          </Link>
        </Commands>
      </Paper>
    </>
  );
}
export default BetaList;
