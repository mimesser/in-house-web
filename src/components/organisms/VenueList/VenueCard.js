import React, { useCallback } from 'react';

import { Address, HelpTip } from '../../atoms';
import { ScoreAndVoters } from '../Venue/ScoreAndVoters';
import { VenueContainer, Img, Industry, Name } from './style';

const helpTip = (
  <>
    <div>select your house to see inside</div>
    <div>HOUSE (n): any business or organization</div>
  </>
);

export const VenueCard = ({ venue, showVenue, withHelp }) => {
  const handleClick = useCallback(() => showVenue(venue), [venue]);

  const {
    votesCount,
    industry,
    name,
    rating,
    venueInfo: { imageUrl, address, city, state, zipCode },
  } = venue;

  const card = (
    // TODO: this should be a link
    <VenueContainer onClick={handleClick}>
      <Img imageUrl={imageUrl} />
      <div>
        <Industry>{industry && industry.name}</Industry>
        <Name>{name}</Name>
        <Address>
          {address}
          <br />
          {city}, {state} {zipCode}
        </Address>
      </div>
      <ScoreAndVoters voteCount={votesCount} voteRating={rating} sliderSize={72} />
    </VenueContainer>
  );

  return withHelp ? <HelpTip tip={helpTip}>{card}</HelpTip> : card;
};
