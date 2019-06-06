import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { ArrowBack } from 'styled-icons/boxicons-regular/ArrowBack';
import { calcRem, spacing, fontSize } from '../../../theme';
import { Votes } from './Votes';
import { Flex } from '../../atoms';

const Back = styled(ArrowBack).attrs({
   size: 32,
})`
   cursor: pointer;
`;

const Header = styled.header`
   background-image: url("${({ imageUrl }) => imageUrl}");
   background-size: cover;
   background-repeat: no-repeat;
   background-position: center center;   
   height: ${calcRem('270px')};
   padding: ${spacing.large};
   color: ${({ theme }) => theme.palette.white};
   
   display: flex;
   flex-direction: column;
    > div {
      display: flex;
      flex: 1;
    }
`;

const About = styled.div`
   margin-top: auto;
   p {
      text-transform: uppercase;
   }
   address {
      font-size: ${fontSize.tiny};
      font-style: normal;
      line-height: 1.2rem;
   }
`;

const Ratings = styled.div`
   margin: auto 0 auto auto;
   display: flex;
   flex-direction: column;

   ${Votes} {
      margin-left: auto;
   }
`;

const Score = styled.div`
   font-size: ${calcRem('60px')};
   sup {
      font-size: 0.65em;
      top: -0.35em;
   }
`;

export const Banner = ({
   venue: {
      imageUrl,
      industry: { name: industry } = {},
      name,
      venueInfo: { address, city, state, zipCode },
      insidersCount,
      rating,
   },
}) => {
   const ratingParts = typeof rating === 'number' && rating.toFixed(1).split('.');

   return (
      <Header imageUrl={imageUrl}>
         <Link href="/houses">
            <Back />
         </Link>
         <div>
            <About>
               <p>{industry}</p>
               <h1>{name}</h1>
               <address>
                  {address}
                  <br />
                  {city}, {state} {zipCode}
               </address>
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
