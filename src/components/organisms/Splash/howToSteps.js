import React from 'react';
import Link from 'next/link';
import styled, { css } from 'styled-components';

import { Heading, Paragraph, Badge, Container, Flex, Button } from '../../atoms';
import { calcRem, spacing } from '../../../theme';

const Copyright = styled.sup`
   top: -1.7em;
   font-size: 0.3em;
   font-weight: bold;

   :after {
      content: '©';
   }
`;

const primaryFont = css`
   font-family: ${({ theme: { fonts } }) => fonts.primary};
   font-weight: 300;
`;

const Help = styled.div`
   ${primaryFont};
   font-size: ${({ theme: { fontSize } }) => fontSize.small};
   color: ${({ theme: { textColors } }) => textColors.primary};
   letter-spacing: ${calcRem('0.5px')};
   opacity: 0.5;
`;

export const Step1 = () => (
   <>
      <Heading>#1: list your house</Heading>
      <Paragraph>you can add your organization</Paragraph>
      <Paragraph>
         <Badge>easily & untraceably</Badge>
      </Paragraph>
      <Paragraph spaceAbove>next — empower your team</Paragraph>
   </>
);

const RegularText = styled.span`
   ${primaryFont};
`;
const AnswerSample = styled.span`
   margin: 0 ${spacing.medium};
`;
const AnswerParagraph = styled(Paragraph)`
   display: flex;
   align-items: center;

   i {
      font-size: 2em;
      margin-left: auto;
   }
`;

export const Step2 = () => (
   <>
      <Heading>
         #2: add a starter MINK
         <Copyright />
         <Help>U.S. patent no. 8,904,502</Help>
      </Heading>
      <Paragraph>create a team-based security question to verify insiders anonymously</Paragraph>
      <Paragraph spaceAbove>
         <Badge wide>what’s the name of satoshi’s new dog?</Badge>
      </Paragraph>
      <AnswerParagraph>
         <Badge>
            <RegularText>(secret answer)</RegularText>
            <AnswerSample>satoshi</AnswerSample>
         </Badge>
         {/* TODO: replace icon */}
         <i className="material-icons">sentiment_satisfied_alt</i>
      </AnswerParagraph>
   </>
);

const Letter = styled.i`
   color: gray;
   transform: scale(1.5, 1) rotate(-0.05turn);
   font-size: ${({ theme: { fontSize } }) => fontSize.small};
   margin-left: ${spacing.medium};
`;
export const Step3 = () => {
   return (
      <>
         <Heading>#3: secret poke your team</Heading>
         <Paragraph>there is power in numbers</Paragraph>
         <Paragraph spaceAbove>use the private share feature to alert your team</Paragraph>
         <Paragraph>
            <Badge>
               {/* TODO: replace icon */}
               anonymously<Letter className="material-icons">send</Letter>
            </Badge>
         </Paragraph>
      </>
   );
};

export const Step4 = () => {
   return (
      <>
         <Heading>
            #4: vote MINK
            <Copyright />
         </Heading>
         <Paragraph>
            <strong>MINK</strong>: a team security question that identifies insiders
         </Paragraph>
         <Paragraph spaceAbove>add new ones any time you feel a need to better identify "insiders"</Paragraph>
         <Paragraph spaceAbove>your team votes and ...</Paragraph>
         <Paragraph spaceAbove>
            <Badge>... the most popular MINK at any time verifies insiders</Badge>
         </Paragraph>
      </>
   );
};

const SeeHousesButton = styled(Button)`
   margin: auto auto 0 auto;
`;
export const Step5 = () => {
   return (
      <>
         <Heading>#5: change everything</Heading>
         <Paragraph spaceAbove>address problems without fear</Paragraph>
         <Paragraph spaceAbove>bypass favoritism & politics</Paragraph>
         <Paragraph spaceAbove>promote the best people & ideas</Paragraph>
         <Paragraph spaceAbove>rate every issue democratically</Paragraph>
         <Paragraph spaceAbove>
            <Badge>drive consensus</Badge>
         </Paragraph>
         <Link href="/home">
            <SeeHousesButton secondary>get notified when live</SeeHousesButton>
         </Link>
      </>
   );
};
