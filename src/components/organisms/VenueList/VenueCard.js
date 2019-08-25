import React, { useCallback } from 'react';

import { Address } from '../../atoms';
import { ScoreAndVoters } from '../Venue/ScoreAndVoters';
import { VenueContainer, Img, Industry, Name } from './style';

export const VenueCard = ({ venue, showVenue }) => {
  const handleClick = useCallback(() => showVenue(venue), [venue]);

  const {
    votesCount,
    industry,
    name,
    rating,
    venueInfo: { imageUrl, address, city, state, zipCode },
  } = venue;

  return (
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
};
