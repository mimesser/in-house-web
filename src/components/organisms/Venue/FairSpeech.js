/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from 'react';
import styled from 'styled-components';

import { Checkbox } from '../../atoms';
import Terms from '../Terms';
import { spacing, palette } from '../../../style';
import { Title } from './newItemStyle';

const Container = styled.div`
   display: flex;
   flex-direction: row;
   text-transform: lowercase;

   > div {
      margin-right: ${spacing.large};
   }
`;
const LinkText = styled.button`
   display: block;
   margin-top: ${spacing.large};
   color: ${palette.textLight};
   border: none;
   outline: none;
   font: inherit;
   background: none;
   padding: 0;
   cursor: pointer;
   &:hover {
      text-decoration: underline;
   }
`;

export const FairSpeech = ({ houseName, acceptedTerms, toggleTerms }) => {
   const [termsModal, showTermsModal] = useState(false);

   return (
      <>
         <Terms open={termsModal} close={() => showTermsModal(false)} modal />
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
               <LinkText onClick={() => showTermsModal(true)}>review terms of service</LinkText>
            </div>
         </Container>
      </>
   );
};
