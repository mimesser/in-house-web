import React from 'react';
import styled from 'styled-components';

import { Dial } from '../../molecules';
import { Votes } from './Votes';
import { spacing, calcRem } from '../../../style';

// TODO: move to venue list styles
export const ScoreAndVoters = styled(({ voteRating, voteCount, sliderSize, className }) => (
  <div className={className}>
    <Dial size={sliderSize} readonly value={voteRating} />
    <Votes count={voteCount} />
  </div>
))`
  display: flex;
  flex-direction: column;
  min-width: ${calcRem('100px')};

  ${Votes} {
    margin: ${spacing.xs} auto 0 auto;
  }

  ${Dial} {
    margin: 0 auto;
  }
`;
