import * as React from 'react';
import {
   Content, Image, Venue, VenueWrapper,
} from './styles';
import IVenue from 'interfaces/IVenue';

interface IProps {
   venue: IVenue,
}

export const VenueList: React.FunctionComponent<IProps> = ({ venue }) => {
   return (
      <VenueWrapper key={venue.id}>
         <Venue>
            <Image src={"https://via.placeholder.com/150" /* venue.cdnImage */} />
            <Content>
               <h3>{venue.name}</h3>
               <span>{venue.venueInfo.address}</span>
               <br />
               <span>{venue.venueInfo.city}</span>
            </Content>
         </Venue>
      </VenueWrapper>
   );
}

export default VenueList;
