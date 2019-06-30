import React from 'react';
import styled from 'styled-components';

import { Slider } from '../../molecules';
import { Votes } from './Votes';
import { spacing, calcRem } from '../../../style';

export const ScoreAndVoters = styled(({ voteRating, voteCount, sliderSize, className }) => (
   <div className={className}>
      <Slider size={sliderSize} readonly value={voteRating} />
      <Votes count={voteCount} />
   </div>
))`
   display: flex;
   flex-direction: column;
   min-width: ${calcRem('100px')};

   ${Votes} {
      margin: ${spacing.large} auto 0 auto;
   }

   ${Slider} {
      margin: 0 auto;
   }
`;
