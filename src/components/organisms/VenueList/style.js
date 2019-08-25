import styled from 'styled-components';

import { calcRem, fontSize, palette, spacing } from '../../../style';
import { Card, Address } from '../../atoms';
import { IconInput } from '../../molecules';

// TODO: move to molecules?
import { ScoreAndVoters } from '../Venue/ScoreAndVoters';
import { Votes } from '../Venue/Votes';

export const SearchBox = styled(IconInput)`
  margin-bottom: ${spacing.xLarge};
`;

export const VenueContainer = styled(Card)`
  margin-bottom: ${spacing.large};
  padding: ${spacing.large};

  ${ScoreAndVoters} {
    min-width: initial;
    margin-left: auto;

    ${Votes} {
      margin-top: ${spacing.tiny};
    }
  }

  ${Address} {
    color: ${palette.textLight};
  }
`;

export const Img = styled.div`
  width: 5.8rem;
  height: 5.8rem;
  flex-shrink: 0;
  margin-right: ${spacing.large};
  background-image: url(${({ imageUrl }) => imageUrl});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const Industry = styled.div`
  font-size: ${fontSize.small};
  color: ${palette.textLight};
  text-transform: uppercase;
  margin-bottom: ${spacing.tiny};
`;

export const Name = styled.div`
  font-size: ${calcRem(20)};
  text-transform: lowercase;
  margin-bottom: ${spacing.tiny};
`;
