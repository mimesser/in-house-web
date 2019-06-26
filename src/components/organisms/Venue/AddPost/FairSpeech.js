/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import styled from 'styled-components';

import { Heading, Checkbox } from '../../../atoms';
import { spacing, palette } from '../../../../style';

const Container = styled.div`
   display: flex;
   flex-direction: row;

   > div:first-child {
      min-width: 2rem;
   }

   a {
      display: block;
      margin-top: ${spacing.xLarge};
      color: ${palette.textDark};
      text-decoration: underline;
   }
`;

export const FairSpeech = ({ acceptedTerms, toggleTerms }) => (
   <>
      <Heading>fair speech?</Heading>
      <Container>
         <div>
            <Checkbox checked={acceptedTerms} onChange={toggleTerms} />
         </div>
         <div>
            <div>
               I acknowledge that I may become personally liable if I state anything beyond an opinion that can be
               construed as defamation, hate-speech, sabotage, harassment, or a falsehood
            </div>
            {/* TODO: fix link */}
            <a
               target="_blank"
               href="https://docs.google.com/document/d/1pyzcmrdEwOXT1UxbgNmBIIRn7_mwI_LmraPHqvZtY0E/view"
            >
               review terms of service
            </a>
         </div>
      </Container>
   </>
);
