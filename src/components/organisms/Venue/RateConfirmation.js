import React from 'react';
import styled from 'styled-components';

import { Heading, HeadingTwo } from '../../atoms';
import { Slider } from '../../molecules';

const Layout = styled.div`
   margin: auto;
`;

export const RateConfirmation = ({ venueName, title, voteCount, voteRating }) => (
   <Layout>
      <Heading>{venueName}</Heading>
      <Heading noMargin>{title}</Heading>
      <div>Team average</div>
      <Slider readonly value={voteRating} />
      <HeadingTwo>Vote count: {voteCount}</HeadingTwo>
   </Layout>
);
