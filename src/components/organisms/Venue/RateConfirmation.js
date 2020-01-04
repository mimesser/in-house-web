import React from 'react';
import styled from 'styled-components';

import { spacing } from '../../../style';
import { Dial } from '../../molecules';
import { H1, H2 } from '../../atoms';
import { Layout } from './openCardStyle';

const RateConfirmationLayout = styled(Layout)`
  margin-top: ${spacing.xxl};

  ${H2} {
    margin-top: ${spacing.xxl};
  }

  ${Dial} {
    margin-top: -30px;
    margin-left: -75px;
  }
`;

export const RateConfirmation = ({ title, voteRating, voteCount }) => (
  <RateConfirmationLayout>
    <H1>team average</H1>
    <H2>{title}</H2>
    <Dial readonly value={voteRating} size={450} padd={78} inverse voteCount={voteCount} />
  </RateConfirmationLayout>
);
