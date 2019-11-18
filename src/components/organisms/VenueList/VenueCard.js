import React, { useCallback } from 'react';

import { Address, HelpTip } from '../../atoms';
import { ScoreAndVoters } from '../Venue/ScoreAndVoters';
import { VenueContainer, Main, Img, Industry, Name, PrivateShareButtonLayout } from './style';
import PrivateShareButton from '../Venue/PrivateShareButton';

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
      <ScoreAndVoters voteCount={votesCount} voteRating={rating} sliderSize={72} />
      <Main>
        <Industry>{industry && industry.name}</Industry>
        <Name>{name}</Name>
        <Address>
          {address}
          <br />
          {city}, {state} {zipCode}
        </Address>
      </Main>
      <PrivateShareButtonLayout>
        <PrivateShareButton id={venue.id} />
      </PrivateShareButtonLayout>
    </VenueContainer>
  );

  return withHelp ? <HelpTip tip={helpTip}>{card}</HelpTip> : card;
};
