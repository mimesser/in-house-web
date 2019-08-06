import React from 'react';
import Link from 'next/link';

import { ArrowLeft } from 'styled-icons/feather/ArrowLeft';

import { Votes } from '../Votes';
import { Address, Title } from '../../../atoms';
import { About, Back, Header, Industry, Ratings, Score } from './style';

export const Banner = ({
   venue: {
      industry: { name: industry } = {},
      name,
      venueInfo: { address, city, state, zipCode, imageUrl },
      insidersCount,
      rating,
   },
   redirectPath,
}) => {
   const ratingParts = typeof rating === 'number' && rating.toFixed(1).split('.');

   return (
      <Header imageUrl={imageUrl}>
         <Link href={redirectPath}>
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
