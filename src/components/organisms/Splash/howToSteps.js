import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { SmileWink } from 'styled-icons/fa-solid/SmileWink';
import { PaperPlane } from 'styled-icons/fa-solid';

import { Heading, Badge, Button, Strong } from '../../atoms';
import { Patent as BasePatent } from '../../molecules';
import { fontSize, spacing, fontWeight } from '../../../theme';

const Patent = styled(BasePatent)`
   font-size: ${fontSize.small};
`;

const P = styled.p``;

export const Step1 = () => (
   <>
      <Heading>#1: list your house</Heading>
      <P>activate your organization</P>
      <P>easily & untraceably</P>
      <P>then empower your team as an insider</P>
   </>
);

const B = styled.b`
   font-weight: ${fontWeight.bold};
`;

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

const Question = styled(P)`
   margin-top: 4.5rem;
`;

const Smile = styled(SmileWink).attrs(({ theme: { palette } }) => ({ size: 24, color: palette.black }))``;

export const Step2 = () => (
   <>
      <Heading>
         #2: insiders only
         <Patent>U.S. patent no. 8,904,502</Patent>
      </Heading>
      <P>
         add a starter <Strong>MINK</Strong>
         <sup>©</sup>
      </P>
      <P>
         <B>a team-based security question</B>
      </P>
      <P>to verify insiders anonymously</P>

      <Question>
         <Badge wide>what’s the conference room wifi password?</Badge>
      </Question>

      <AnswerRow>
         <span>(secret answer)</span>
         <AnswerSample>bingo99</AnswerSample>
         <Smile />
      </AnswerRow>
   </>
);

const Poke = styled(PaperPlane).attrs(({ theme: { palette } }) => ({
   size: 24,
   color: palette.grayscale[3],
}))`
   transform: scale(1.5, 1) rotate(30deg);
   margin-left: ${spacing.tiny};
`;
export const Step3 = () => {
   return (
      <>
         <Heading>#3: poke your team</Heading>
         <P>use our secret share feature</P>
         <P>to spread the word</P>
         <P>
            <Poke />
         </P>
         <P>
            <B>anonymously</B>
         </P>
      </>
   );
};

const Copyright = styled.sup`
   font-weight: ${fontWeight.bold};
   margin-left: ${spacing.xLarge};
`;
const ExplainMink = styled(P)`
   font-size: ${fontSize.tiny};
   color: ${({ theme: { palette } }) => palette.grayscale[1]};
   ${Strong} {
      font-size: ${fontSize.tiny};
      font-weight: ${fontWeight.bold};
      color: ${({ theme }) => theme.textColors.emphasis};
   }
`;

export const Step4 = () => {
   return (
      <>
         <Heading>
            #4: vote top MINK
            <Copyright>©</Copyright>
         </Heading>
         <ExplainMink>
            <Strong>
               MINK<sup>©</sup>
            </Strong>{' '}
            the most popular team security question that users must answer to gain access to a house
         </ExplainMink>
         <P>anyone can add MINKS they feel will best identify insiders</P>
         <P>your team votes</P>
         <P>
            <B>and the most popular MINK at any time verifies insiders</B>
         </P>
      </>
   );
};

const ExtraMargin = styled(P)`
   margin-bottom: 2rem;
`;
const SeeHousesButton = styled(Button)`
   margin: auto auto 2rem auto;
`;
export const Step5 = () => {
   return (
      <>
         <Heading>#5: everything changes</Heading>
         <P>address problems without fear</P>
         <P>expose favoritism & politics</P>
         <P>promote the best people & ideas</P>
         <P>rate everything democratically</P>
         <ExtraMargin>
            <B>empower consensus</B>
         </ExtraMargin>
         <Link href="/notify">
            <SeeHousesButton>get notified when live</SeeHousesButton>
         </Link>
      </>
   );
};
