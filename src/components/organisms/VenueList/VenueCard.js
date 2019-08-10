import React, { useCallback } from 'react';

import { Address } from '../../atoms';
import { ScoreAndVoters } from '../Venue/ScoreAndVoters';
import { Container, Img, Industry, Name } from './style';

export const VenueCard = ({ venue, showVenue }) => {
   const handleClick = useCallback(() => showVenue(venue), [venue]);

   const {
      insidersCount,
      industry,
      name,
      rating,
      venueInfo: { imageUrl, address, city, state, zipCode },
   } = venue;

   return (
      // TODO: this should be a link
      <Container onClick={handleClick}>
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
         <ScoreAndVoters voteCount={insidersCount} voteRating={rating} sliderSize={72} />
      </Container>
   );
};
