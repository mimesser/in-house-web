import React from 'react';

import { Slider } from '../../molecules';
import { Layout, VenueTitle, ItemTitle, TeamAverage } from './voteStyle';

export const RateConfirmation = ({ venueName, title, voteRating }) => (
   <Layout>
      <VenueTitle>{venueName}</VenueTitle>
      <ItemTitle>{title}</ItemTitle>
      <TeamAverage>Team average</TeamAverage>
      <Slider readonly value={voteRating} size={280} />
   </Layout>
);
