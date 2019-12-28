import styled from 'styled-components';

import { calcRem, palette, spacing, cover } from '../../../style';
import { Card, Address, Button, Break } from '../../atoms';
import { IconInput, PokeButton } from '../../molecules';

// TODO: move to molecules?
import { ScoreAndVoters } from '../Venue/ScoreAndVoters';
import { Votes } from '../Venue/Votes';

export const Layout = styled.div`
  padding: ${spacing.lg} ${spacing.xxl} ${spacing.xxl};
  display: flex;
  flex-direction: column;
  flex: none; // safari
  flex-grow: 1;

  > ${Button} {
    margin-top: ${spacing.lg};
    align-self: flex-start;
  }
`;

export const SearchBox = styled(IconInput)`
  margin-bottom: ${spacing.lg};
`;

export const NoResults = styled.div`
  color: ${palette.gray};
  margin-bottom: ${spacing.lg};
`;

export const Industry = styled.div`
  text-transform: uppercase;
  margin-bottom: ${spacing.xs};
`;

export const VenueContainer = styled(Card)`
  box-shadow: 0 ${calcRem('3px')} ${calcRem('6px')} rgba(0, 0, 0, 0.161);
  margin-bottom: ${spacing.lg};

  ${ScoreAndVoters} {
    flex-shrink: 0;
    min-width: initial;
    margin: ${spacing.lg};

    ${Votes} {
      margin-top: ${spacing.xs};
    }
  }

  ${Address}, ${Industry} {
    color: ${palette.lightGray};
  }

  ${Break} {
    height: ${calcRem('2px')};
    width: ${calcRem('40px')};
    margin: ${spacing.sm} 0;
  }
`;

export const PrivateShareButtonLayout = styled.div`
  position: relative;

  > ${PokeButton} {
    position: absolute;
    top: -${spacing.md};
    right: -${spacing.sm};
  }
`;

export const Main = styled.div.attrs(({ imageUrl }) => imageUrl && { style: { backgroundImage: `url(${imageUrl})` } })`
  position: relative;
  flex: 1;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  :before {
    ${cover()};
    content: '';
    background-color: ${palette.black};
    opacity: 0.5;
  }

  padding: ${spacing.md};
  > * {
    position: relative;
    z-index: 1;
    color: ${palette.offWhite};
  }
`;
