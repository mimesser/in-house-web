import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { ArrowBack } from 'styled-icons/boxicons-regular/ArrowBack';
import { calcRem, spacing, fontSize } from '../../../theme';
import { Votes } from './Votes';
import { IconButton } from '../../atoms';

const Back = styled(IconButton)`
   margin-right: auto;
`;

const Header = styled.header`
   position: relative;
   height: ${calcRem('270px')};
   padding: ${spacing.large};
   color: ${({ theme }) => theme.palette.white};

   display: flex;
   flex-direction: column;
   > div {
      display: flex;
      flex: 1;
   }

   > * {
      z-index: 1;
   }
   
   background-image: url("${({ imageUrl }) => imageUrl}");
   background-size: cover;
   background-repeat: no-repeat;
   background-position: center center;  
   
   :after {
      position: absolute;
      top:0;
      bottom: 0;
      right: 0;
      left: 0;
      content: '';
      background-color: rgba(85,116,128,0.5);
      background: linear-gradient(180deg, rgba(129,149,156,0.5) 0%, rgba(0,0,0,0.5) 100%);
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
            <Back>
               <ArrowBack size={32} />
            </Back>
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
