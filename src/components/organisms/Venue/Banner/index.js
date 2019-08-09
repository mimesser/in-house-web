import React from 'react';
import Link from 'next/link';

import { ArrowLeft } from 'styled-icons/feather/ArrowLeft';

import { Votes } from '../Votes';
import { Address, Title } from '../../../atoms';
import { About, Back, Header, Industry, Ratings, Score } from './style';
import { DEMO_VENUE_ID } from '../../../../store/demo/data';

export const Banner = ({
   venue: {
      id,
      industry: { name: industry } = {},
      name,
      venueInfo: { address, city, state, zipCode, imageUrl },
      insidersCount,
      rating,
   },
}) => {
   const ratingParts = typeof rating === 'number' && rating.toFixed(1).split('.');
   const href = id === DEMO_VENUE_ID ? '/how-it-works?step=5' : '/houses';

   return (
      <Header imageUrl={imageUrl}>
         <Link href={href}>
            <Back>
               <ArrowLeft size={32} />
            </Back>
         </Link>
         <div>
            <About>
               <Industry>{industry}</Industry>
               <Title>{name}</Title>
               <Address>
                  {address}
                  <br />
                  {city}, {state} {zipCode}
               </Address>
            </About>
            <Ratings>
               <Score>
                  {ratingParts ? (
                     <>
                        {ratingParts[0]}.<sup>{ratingParts[1]}</sup>
                     </>
                  ) : (
                     '—'
                  )}
               </Score>
               <Votes count={insidersCount} />
            </Ratings>
         </div>
      </Header>
   );
};
