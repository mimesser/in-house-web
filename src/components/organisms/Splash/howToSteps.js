import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { PaperPlane } from 'styled-icons/fa-solid';
import { ArrowRight } from 'styled-icons/evil/ArrowRight';

import { Heading, Button, Strong } from '../../atoms';
import { Patent as BasePatent } from '../../molecules';
import { fontSize, spacing, fontWeight, palette } from '../../../style';
import { settings } from '../../../settings';
import { DEMO_VENUE_ID } from '../../../store/demo/data';

const Patent = styled(BasePatent)`
  font-size: ${fontSize.small};
`;

const P = styled.p``;

export const Step1 = () => (
  <>
    <Heading>#1: list your house</Heading>
    <P>activate your organization easily & untraceably</P>
    <P>
      <Strong>and then empower your team as an insider</Strong>
    </P>
  </>
);

const AnswerSample = styled.span`
  margin: 0 ${spacing.large};
  text-decoration: underline;
  font-style: italic;
  font-size: ${fontSize.large};
`;
const AnswerRow = styled(P)`
  display: flex;
  align-items: center;

  i {
    font-size: 2em;
    margin-left: auto;
  }
`;

const MinkSample = styled.div`
  max-width: 75%;
  padding: ${spacing.large};
  background-color: ${palette.primary};
  > div {
    :nth-child(1) {
      font-size: ${fontSize.tiny};
      color: ${palette.secondaryLight};
      margin-bottom: ${spacing.small};
    }
    :nth-child(2) {
      font-size: ${fontSize.medium};
      color: ${palette.white};
      font-weight: ${fontWeight.bolder};
      margin-bottom: ${spacing.small};
    }
    :nth-child(3) {
      display: flex;
      align-items: center;
      > div {
        font-size: ${fontSize.small};
        padding: ${spacing.tiny} ${spacing.small};
        background-color: ${palette.white};
        font-weight: ${fontWeight.bolder};
        flex: 1;
        margin-right: ${spacing.small};
      }
    }
  }
`;

export const Step2 = () => (
  <>
    <Heading>
      #2: add a MINK<sup>©</sup>
      <Patent />
    </Heading>
    <P>
      <Strong>MINK: a team-based security question</Strong>
    </P>
    <P>to verify insiders anonymously</P>

    <MinkSample>
      <div>
        answer the #1 MINK<sup>©</sup>
      </div>
      <div>what's the name of simone's new puppy?</div>
      <div>
        <div>cupcake</div>
        <ArrowRight size={36} color="white" />
      </div>
    </MinkSample>
  </>
);

const Poke = styled(PaperPlane).attrs(({ theme }) => ({
  size: 24,
  color: theme.colors.secondary,
}))`
  transform: scale(1.5, 1) rotate(30deg);
  margin-left: ${spacing.tiny};
`;
export const Step3 = () => {
  return (
    <>
      <Heading>#3: alert your team</Heading>
      <P>use our secret share feature to spread the word</P>
      <P>
        <Poke />
      </P>
      <P>
        <Strong>safely & anonymously</Strong>
      </P>
    </>
  );
};

export const Step4 = () => {
  return (
    <>
      <Heading>#4: allow insiders only</Heading>
      <P>anyone can add a new MINK that they think will better identify insiders</P>
      <P>your team votes</P>
      <P>
        <Strong>and the most popular MINK at any time verifies insiders</Strong>
      </P>
    </>
  );
};

const ContinueOptions = styled.div`
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  ${Button} {
    margin: ${spacing.tiny};
    min-width: 10rem;
  }
`;

const ContinueButton = () => {
  if (settings.preLaunchMode) {
    return (
      <Link href="/notify">
        <Button>get notified when live</Button>
      </Link>
    );
  }
  return (
    <Button tag="a" href={`/houses/${DEMO_VENUE_ID}`}>
      test drive
    </Button>
  );
};

export const Step5 = () => {
  return (
    <>
      <Heading>change everything</Heading>
      <P>address problems without fear</P>
      <P>expose favoritism & politics</P>
      <P>promote the best people & ideas</P>
      <P>rate everything democratically</P>
      <Strong>empower consensus</Strong>
      <ContinueOptions>
        <ContinueButton />
      </ContinueOptions>
    </>
  );
};
