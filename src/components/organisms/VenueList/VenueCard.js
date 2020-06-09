import React, { useCallback } from 'react';

import styled from 'styled-components';
import { spacing } from '../../../style';
import { Address, HelpTip, HouseNameLarge, Break } from '../../atoms';
import { ScoreAndVoters } from '../Venue/ScoreAndVoters';
import { VenueContainer, Main, Industry } from './style';

const helpTip = (
  <>
    <div>select your house to see inside</div>
    <div>HOUSE (n): any business or organization</div>
  </>
);

const BoldBreak = styled(Break)`
  min-width: 42px;
  min-height: 6px;
`;

export const VenueCard = ({ venue, showVenue, withHelp }) => {
  const handleClick = useCallback(() => showVenue(venue), [venue]);

  const {
    votesCount,
    industry,
    name,
    rating,
    venueInfo: { imageUrl, address, city, state, zipCode },
  } = venue;

  const addressBlock = venue.isPoll ? (
    <>
      <BoldBreak />
      <Address>{address}</Address>
    </>
  ) : (
    <>
      <Break />
      <Address>
        {address},
        <br />
        {city} {zipCode}
      </Address>
    </>
  );

  const card = (
    // TODO: this should be a link
    <VenueContainer onClick={handleClick}>
      <div>
        <ScoreAndVoters voteCount={votesCount} voteRating={rating} sliderSize={72} />
        <Main imageUrl={imageUrl}>
          <Industry>{industry && industry.name}</Industry>
          <HouseNameLarge>{name}</HouseNameLarge>

          {addressBlock}
        </Main>
      </div>
      {/* TODO: bring back once design provided */}
      {/* <PrivateShareButtonLayout> */}
      {/*  <PrivateShareButton id={venue.id} /> */}
      {/* </PrivateShareButtonLayout> */}
    </VenueContainer>
  );

  return withHelp ? <HelpTip tip={helpTip}>{card}</HelpTip> : card;
};
