import styled, { css } from 'styled-components';

import { calcRem, spacing, fontSize, palette, font } from '../../../style';
import { Card, Button, Break } from '../../atoms';
import { PokeButton, Dial } from '../../molecules';

export const TabTitle = styled.div`
  padding: ${spacing.xl} ${spacing.xxl};
  text-transform: uppercase;
  color: ${palette.mediumGray};
`;

export const ItemTime = styled.time`
  color: ${palette.gray};
  font-size: ${fontSize.xs};
`;

export const ItemTitle = styled.div`
  color: ${palette.primary};
  font-size: ${fontSize.md};
  ${font.bold};
  width: 80%;
`;

export const ItemText = styled.div`
  font-size: ${fontSize.sm};
  color: ${palette.gray};
  margin-top: ${spacing.sm};
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

export const cardStyle = css`
  position: relative;
  border-bottom: 1px solid ${palette.lightGray};
  padding: ${spacing.xl};

  ${Dial} {
    margin-right: ${spacing.xl};
  }
  ${Break} {
    color: ${palette.primary};
    height: ${calcRem('2px')};
    width: ${calcRem('40px')};
    margin: ${spacing.md} 0;
  }
`;

export const TabLayout = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-bottom: ${spacing.md};
  flex-shrink: 0; // safari
  flex-basis: auto; // safari

  ${Card} {
    ${cardStyle};
  }

  > ${Button} {
    align-self: flex-start;
    margin: ${spacing.xxl};
  }
`;
