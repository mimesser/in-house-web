import styled from 'styled-components';

import { calcRem, spacing, fontSize, palette, fontWeight } from '../../../style';
import { Card, Button, Break } from '../../atoms';
import { PokeButton, Dial } from '../../molecules';
import { Votes } from './Votes';

export const CARD_MIN_HEIGHT = calcRem('125px');

export const TabTitle = styled.div`
  margin: ${spacing.xl} ${spacing.xxl};
  text-transform: uppercase;
  color: ${palette.mediumGray};
`;

export const ItemTime = styled.time`
  color: ${palette.lightGray};
`;

export const ItemTitle = styled.div`
  margin-top: ${spacing.xxs};
  color: ${palette.primary};
  font-size: ${fontSize.md};
  font-weight: ${fontWeight.bold};
  width: 80%;
`;

export const ItemText = styled.div`
  font-size: ${fontSize.sm};
  color: ${palette.lightGray};
  margin-top: ${spacing.xl};
  && {
    display: -webkit-box;
  }
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  color: ${palette.gray};
`;

export const TabLayout = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-bottom: ${spacing.md};
  flex-shrink: 0; // safari
  flex-basis: auto; // safari

  ${Card} {
    position: relative;
    min-height: ${CARD_MIN_HEIGHT};
    border-bottom: 1px solid ${palette.lightGray};
    padding: ${spacing.xl};

    ${PokeButton} {
      position: absolute;
      top: ${spacing.lg};
      right: ${spacing.xl};
    }
    ${Dial} {
      margin-right: ${spacing.xl};
    }
    ${Break} {
      color: ${palette.primary};
      height: ${calcRem('2px')};
      width: ${calcRem('40px')};
      margin: ${spacing.sm} 0;
    }
    ${Votes} {
      margin-right: ${spacing.sm};
    }
  }

  > ${Button} {
    align-self: flex-start;
    margin: ${spacing.xxl};
  }
`;
