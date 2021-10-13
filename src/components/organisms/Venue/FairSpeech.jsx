/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import styled from 'styled-components';

import { Checkbox, H1 } from '../../atoms';
import { spacing } from '../../../style';

const Check = styled(Checkbox)`
  margin-top: ${spacing.xxxl};
`;

export const FairSpeech = ({ acceptedTerms, toggleTerms }) => {
  return (
    <>
      <H1>fair speech?</H1>
      <Check checked={acceptedTerms} onChange={toggleTerms}>
        I acknowledge that I may become personally liable if I state anything beyond an opinion that
        can be construed as defamation, hate-speech, sabotage, harassment, or a falsehood
      </Check>
    </>
  );
};
