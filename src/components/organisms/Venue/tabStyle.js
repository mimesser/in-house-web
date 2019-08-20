import styled, { css } from 'styled-components';

import { calcRem, spacing, fontWeight, fontSize, font, palette } from '../../../style';
import { Card, Button } from '../../atoms';
import { PokeButton } from '../../molecules';

export const CARD_MIN_HEIGHT = calcRem('125px');

export const TabTitle = styled.div`
   margin: ${spacing.large} 0;
   text-transform: uppercase;
`;

export const ItemTime = styled.time`
   font-size: ${fontSize.tiny};
   font-family: ${font.number};
   color: ${palette.textLight};
`;

export const ItemTitle = styled.div`
   margin-top: ${spacing.nano};
`;

export const ItemText = styled.div`
   font-size: ${fontSize.small};
   color: ${palette.textLight};
   margin-top: ${spacing.nano};
`;

export const Main = styled.div``;

const adjustForPreview = ({ preview }) =>
   preview &&
   css`
      border: none;
      background: none;
      box-shadow: none;
   `;
export const ItemCard = styled(Card)`
   text-transform: lowercase;

   ${ItemTitle} {
      font-size: ${({ large }) => (large ? `${fontSize.mediumLarge}` : `${fontSize.primary}`)};
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
      padding: ${spacing.large} ${spacing.medium} ${spacing.large};

      :last-of-type {
         margin-bottom: ${spacing.large};
      }

      ${PokeButton} {
         position: absolute;
         top: ${spacing.medium};
         right: ${spacing.xLarge};
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
