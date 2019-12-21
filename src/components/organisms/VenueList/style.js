import styled from 'styled-components';

import { calcRem, fontSize, palette, spacing } from '../../../style';
import { Card, Address, Button } from '../../atoms';
import { IconInput, PokeButton } from '../../molecules';

// TODO: move to molecules?
import { ScoreAndVoters } from '../Venue/ScoreAndVoters';
import { Votes } from '../Venue/Votes';

export const Layout = styled.div`
  padding: ${spacing.md} ${spacing.sm};
  display: flex;
  flex-direction: column;
  flex: none; // safari
  flex-grow: 1;
`;

export const SearchBox = styled(IconInput)`
  margin-bottom: ${spacing.xl};
`;

export const ListYourHouse = styled(Button).attrs(() => ({ secondary: true }))`
  margin: 0 auto;
`;

export const VenueContainer = styled(Card)`
  margin-bottom: ${spacing.lg};
  padding: ${spacing.lg};

  ${ScoreAndVoters} {
    min-width: initial;
    margin: auto ${spacing.sm};

    ${Votes} {
      margin-top: ${spacing.xs};
    }
  }

  ${Address} {
    color: ${palette.lightGray};
  }
`;

export const Img = styled.div`
  width: 5.8rem;
  height: 5.8rem;
  flex-shrink: 0;
  background-image: url(${({ imageUrl }) => imageUrl});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const Industry = styled.div`
  font-size: ${fontSize.sm};
  color: ${palette.lightGray};
  text-transform: uppercase;
  margin-bottom: ${spacing.xs};
`;

export const Name = styled.div`
  font-size: ${calcRem(20)};
  text-transform: lowercase;
  margin-bottom: ${spacing.xs};
`;

export const PrivateShareButtonLayout = styled.div`
  position: relative;

  > ${PokeButton} {
    position: absolute;
    top: -${spacing.md};
    right: -${spacing.sm};
  }
`;

export const Main = styled.div`
  margin-right: auto;
`;
