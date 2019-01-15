import * as React from 'react';
import {
   Content, Image, Venue, VenueWrapper,
} from './styles';

export default function VenueList ({ venue }) {
   return (
      <VenueWrapper key={venue.id}>
         <Venue>
            <Image src={venue.cdnImage} />
            <Content>
               <h3>{venue.name}</h3>
               <span>{venue.addressDisplay}</span>
            </Content>
         </Venue>
      </VenueWrapper>
   );
}
