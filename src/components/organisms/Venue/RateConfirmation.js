import React from 'react';

import { Dial } from '../../molecules';
import { Layout, ItemTitle, SubTitle, ItemDate } from './openCardStyle';
import { formatDate } from '../../../utils/format';

export const RateConfirmation = ({ title, date, voteRating, voteCount }) => (
   <Layout>
      {date && <ItemDate>{formatDate(date)}</ItemDate>}
      <ItemTitle inverse>{title}</ItemTitle>
      <SubTitle>Team average</SubTitle>
      <Dial readonly value={voteRating} size={450} padd={100} inverse voteCount={voteCount} />
   </Layout>
);
