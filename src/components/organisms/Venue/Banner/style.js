import styled from 'styled-components';
import { rgba } from 'polished';

import { cover, palette, spacing } from '../../../../style';
import { H1, Industry, Address } from '../../../atoms';
import { Votes } from '../Votes';

export const Header = styled.header`
  position: relative;
  padding: ${spacing.xl} ${spacing.lg} ${spacing.xxl} ${spacing.xxl};
  color: ${palette.offWhite};
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
    flex: 1;

    > div:first-child {
      margin-right: auto;
    }
  }

  > * {
    position: relative;
  }

  // > * {
  //   ${({ showHelp }) => !showHelp && 'z-index: 1'};
  // }

  ${Industry} {
    margin: ${spacing.xl} 0 ${spacing.md};
  }

  ${Industry}, ${Address} {
    color: ${palette.gray};
  }

  ${H1} {
    margin-bottom: ${spacing.md};
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
  margin: auto 0 ${spacing.md} ${spacing.md};
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  ${Votes} {
    margin: ${spacing.md} auto 0;
  }
`;
