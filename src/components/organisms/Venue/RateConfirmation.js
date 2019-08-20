import React from 'react';
import styled from 'styled-components';

import { Dial } from '../../molecules';
import { ItemTitle, Layout, SubTitle, ItemDate } from './openCardStyle';
import { formatDate } from '../../../utils/format';
import { fontSize, fontWeight, spacing, palette } from '../../../style';

const RateConfirmationLayout = styled(Layout)`
   margin-top: ${spacing.xxLarge};

   ${ItemTitle} {
      color: ${palette.textUltraLight};
      font-size: ${fontSize.large};
      font-weight: ${fontWeight.primary};
   }

   ${SubTitle} {
      margin-bottom: ${spacing.nano};
   }

   ${Dial} {
      margin-top: -30px;
      margin-left: -75px;
   }
`;

export const RateConfirmation = ({ title, date, voteRating, voteCount }) => (
   <RateConfirmationLayout>
      {date && <ItemDate>{formatDate(date)}</ItemDate>}
      <SubTitle>team average</SubTitle>
      <ItemTitle>{title}</ItemTitle>
      <Dial readonly value={voteRating} size={350} padd={78} inverse voteCount={voteCount} />
   </RateConfirmationLayout>
);
