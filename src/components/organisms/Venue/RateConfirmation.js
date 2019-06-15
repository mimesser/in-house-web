import React from 'react';
import styled from 'styled-components';

import { Heading, HeadingTwo } from '../../atoms';
import { Score } from './commonStyle';

const Layout = styled.div`
   margin: auto;
`;

export const RateConfirmation = ({ venueName, title, voteCount, voteRating }) => (
   <Layout>
      <Heading>{venueName}</Heading>
      <Heading noMargin>{title}</Heading>
      <div>Team average</div>
      <Score>{voteRating}</Score>
      <HeadingTwo>Vote count: {voteCount}</HeadingTwo>
   </Layout>
);
