import styled, { css } from 'styled-components';

import { calcRem, palette, spacing, fontWeight, fontSize } from '../../../style';
import { Card, Button } from '../../atoms';
import { PokeButton } from '../../molecules';

export const CARD_MIN_HEIGHT = calcRem('125px');

export const TabTitle = styled.div`
   margin: ${spacing.large} 0;
   text-transform: uppercase;
   color: ${palette.textLight};
`;

export const ItemTitle = styled.div`
   font-size: ${fontSize.large};
   font-weight: ${fontWeight.bolder};
   margin-top: ${spacing.large};
`;

export const ItemText = styled.div``;

export const Main = styled.div`
   display: flex;
   flex-direction: column;
`;

const adjustForPreview = ({ preview }) =>
   preview &&
   css`
      border: none;
      background: none;
      box-shadow: none;
   `;
export const ItemCard = styled(Card)`
   text-transform: lowercase;
   ${ItemText} {
      font-size: ${({ large }) => (large ? fontSize.primary : fontSize.tiny)};
   }
   ${adjustForPreview};
`;

export const TabLayout = styled.div`
   display: flex;
   flex: 1;
   flex-direction: column;
   padding: 0 ${spacing.medium} ${spacing.medium} ${spacing.medium};
   
   ${Card} {
      position: relative;
      min-height: ${CARD_MIN_HEIGHT};
      padding: ${spacing.small} ${spacing.medium} ${spacing.large} 0;
      
      :last-of-type {
         margin-bottom: ${spacing.large};
      }
      
      ${PokeButton} {
         position: absolute;
         top: ${spacing.small};
         right: ${spacing.medium};
      }
   }
   
   ${Card} + ${Card} {
      margin-top: ${spacing.medium};
   }
   
   > ${Button} {
       min-width: 10rem;
       margin: auto;
   }
`;
