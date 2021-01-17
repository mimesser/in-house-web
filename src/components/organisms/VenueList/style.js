import styled from 'styled-components';

import { calcRem, palette, spacing, cover, breakpoints, onDesktop, onDesktopOverflowAuto } from '../../../style';
import { Card, Address, Button, Break, TransparentLinkStyle } from '../../atoms';
import { IconInput, PokeButton } from '../../molecules';

// TODO: move to molecules?
import { ScoreAndInsiders } from '../Venue/ScoreAndInsiders';
import { IconBadge } from '../Venue/IconBadge';

export const Layout = styled.div`
  display: flex;
  flex: 1;
  ${onDesktopOverflowAuto};
`;

export const Results = styled.div`
  padding: ${spacing.lg} ${spacing.md} ${spacing.md};
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${palette.offWhite};
  ${onDesktop(`max-width: ${breakpoints.xs}`)};
  ${onDesktopOverflowAuto};

  > ${Button} {
    margin-top: ${spacing.lg};
    align-self: flex-start;
  }

  > * {
    // safari
    flex-shrink: 0;
  }
`;

export const SelectedItemArea = styled.div`
  display: none;
  flex: 1;
  ${onDesktop(`display: flex`)};
`;

export const SearchBox = styled(IconInput)`
  margin-bottom: ${spacing.xl};
`;

export const NoResultsSearchLabel = styled.div`
  color: ${palette.gray};
  margin-bottom: ${spacing.lg};
`;

export const CantFindHouse = styled.div`
  margin: auto;
  > a {
    ${TransparentLinkStyle};
    color: currentColor;
    margin-top: ${spacing.xl};
  }
`;

export const Industry = styled.div`
  text-transform: uppercase;
  margin-bottom: ${spacing.xs};
`;

export const VenueContainer = styled(Card)`
  box-shadow: 0 ${calcRem('3px')} ${calcRem('6px')} rgba(0, 0, 0, 0.161);
  margin-bottom: ${spacing.lg};
  display: flex;
  flex-direction: row;

  ${ScoreAndInsiders} {
    flex-shrink: 0;
    min-width: initial;
    margin: ${spacing.lg};

    ${IconBadge} {
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

  min-height: 98px;
  padding: ${spacing.md};
  > * {
    position: relative;
    color: ${palette.offWhite};
  }
`;
