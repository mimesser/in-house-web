import React from 'react';

import { Slider } from '../../molecules';
import { Layout, VenueTitle, ItemTitle, TeamAverage, ItemDate } from './openCardStyle';
import { formatDate } from '../../../utils/format';

export const RateConfirmation = ({ venueName, title, date, voteRating }) => (
   <Layout>
      <VenueTitle>{venueName}</VenueTitle>
      {date && <ItemDate>{formatDate(date)}</ItemDate>}
      <ItemTitle>{title}</ItemTitle>
      <TeamAverage>Team average</TeamAverage>
      <Slider readonly value={voteRating} size={250} />
   </Layout>
);
