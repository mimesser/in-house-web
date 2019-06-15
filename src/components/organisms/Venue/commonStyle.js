import React from 'react';
import styled from 'styled-components';

import { calcRem, spacing } from '../../../theme';
import { Card } from '../../atoms';
import { PokeButton } from '../../molecules';

export const CARD_MIN_HEIGHT = calcRem('125px');

export const Score = styled.div`
   flex-shrink: 0;
   width: 6rem;
   height: 6rem;
   border: 4px solid;
   border-radius: 50%;
   display: flex;
   align-items: center;
   justify-content: center;
   margin-right: ${spacing.medium};
`;

export const TabLayout = styled.div`
   display: flex;
   flex: 1;
   flex-direction: column;
   padding: 0 ${spacing.medium} ${spacing.medium} ${spacing.medium};
   
   ${Card} {
      position: relative;
      min-height: ${CARD_MIN_HEIGHT};
      padding: ${spacing.large} ${spacing.medium};
      
      ${PokeButton} {
         position: absolute;
         top: ${spacing.medium};
         right: ${spacing.medium};
      }
   }
   
   ${Card} + ${Card} {
      margin-top: ${spacing.medium};
   }
`;
