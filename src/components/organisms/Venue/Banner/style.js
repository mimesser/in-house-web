import styled from 'styled-components';
import { rgba } from 'polished';

import { cover, palette, spacing, fontSize } from '../../../../style';
import { H1, Industry, Address, NumberLarge } from '../../../atoms';
import { Votes } from '../Votes';

export const Header = styled.header`
  position: relative;
  padding: ${spacing.xxl};
  color: ${palette.offWhite};
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
  }

  > * {
    position: relative;
  }

  // > * {
  //   ${({ showHelp }) => !showHelp && 'z-index: 1'};
  // }

  ${Industry} {
    margin: ${spacing.xl} 0 ${spacing.sm};
  }

  ${Industry}, ${Address} {
    color: ${palette.gray};
  }

  ${H1} {
    margin-bottom: ${spacing.md};
  }

  ${NumberLarge} {
    align-self: center;
  }

  ${Votes} {
    align-self: flex-end;
    line-height: 1;
    margin-bottom: ${spacing.xxs};

    span:last-of-type {
      font-size: ${fontSize.md};
    }
  }

  sup {
    top: -${spacing.xl};
    left: 0;
  }

  background-image: url("${({ imageUrl }) => imageUrl}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  :before {
    content: '';
    ${cover()};
    background-color: ${rgba(palette.black, 0.5)};
  }
`;

export const Ratings = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;
