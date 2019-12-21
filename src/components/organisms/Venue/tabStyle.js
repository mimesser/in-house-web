import styled, { css } from 'styled-components';

import { calcRem, spacing, fontSize, palette } from '../../../style';
import { Card, Button } from '../../atoms';
import { PokeButton } from '../../molecules';

export const CARD_MIN_HEIGHT = calcRem('125px');

export const TabTitle = styled.div`
  margin: ${spacing.lg} 0;
  text-transform: uppercase;
`;

export const ItemTime = styled.time`
  font-size: ${fontSize.xs};
  color: ${palette.lightGray};
`;

export const ItemTitle = styled.div`
  margin-top: ${spacing.xxs};
`;

export const ItemText = styled.div`
  font-size: ${fontSize.sm};
  color: ${palette.lightGray};
  margin-top: ${spacing.xxs};
  display: block;
  display: -webkit-box;
  max-width: 200px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
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

  ${ItemTitle} {
    font-size: ${({ large }) => (large ? `${fontSize.md}` : `${fontSize.sm}`)};
  }

  ${adjustForPreview};
`;

export const TabLayout = styled.div`
   display: flex;
   flex: 1;
   flex-direction: column;
   padding: 0 ${spacing.md} ${spacing.md} ${spacing.md};
   flex-shrink: 0; // safari
   flex-basis: auto; // safari

   ${Card} {
      position: relative;
      min-height: ${CARD_MIN_HEIGHT};
      padding: ${spacing.lg} ${spacing.md} ${spacing.lg};

      :last-of-type {
         margin-bottom: ${spacing.lg};
      }

      ${PokeButton} {
         position: absolute;
         top: ${spacing.md};
         right: ${spacing.xl};
      }
   }

   ${Card} + ${Card} {
      margin-top: ${spacing.md};
   }

   > ${Button} {
       min-width: 10rem;
       margin: auto;
   }
`;
