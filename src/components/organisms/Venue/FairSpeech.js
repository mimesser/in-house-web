/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import styled from 'styled-components';

import { Checkbox } from '../../atoms';
import { spacing, palette } from '../../../style';
import { Title } from './newItemStyle';

const Container = styled.div`
   display: flex;
   flex-direction: row;
   text-transform: lowercase;

   > div {
      margin-right: ${spacing.large};
   }

   a {
      display: block;
      margin-top: ${spacing.large};
      color: ${palette.textLight};
      text-decoration: none;
      cursor: pointer;
   }
`;

export const FairSpeech = ({ houseName, acceptedTerms, toggleTerms }) => (
   <>
      <Title action="fair speech?" houseName={houseName} />
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
