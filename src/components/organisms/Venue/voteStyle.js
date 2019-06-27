import styled from 'styled-components';

import { palette, spacing, fontSize, fontWeight } from '../../../style';
import { IconButton } from '../../atoms';
import { Slider } from '../../molecules';

export const VenueTitle = styled.div`
   text-transform: uppercase;
   color: ${palette.textLight};
   margin-bottom: ${spacing.large};
`;

export const ItemTitle = styled.div`
   text-transform: lowercase;
   font-size: ${fontSize.xLarge};
   font-weight: ${fontWeight.bolder};
   color: ${palette.textDark};
   margin-bottom: ${spacing.small};
`;

export const VoteButton = styled(IconButton)`
   color: ${({ selected }) => (selected ? palette.textDark : palette.textLight)};
   &[disabled] {
      color: ${palette.secondaryLight};
   }
`;

export const VoteArea = styled.div`
   display: flex;
   flex-direction: row;

   > div:first-child {
      flex: 0;
      margin-right: ${spacing.small};

      ${VoteButton} {
         &:last-child {
            margin-top: ${spacing.large};
         }
      }
   }
`;

export const Layout = styled.div`
   padding: 0 ${spacing.large};

   display: flex;
   flex-direction: column;

   ${Slider} {
      margin: 0 auto;
   }
`;

export const TeamAverage = styled.div`
   font-size: ${fontSize.large};
   color: ${palette.textDark};
   margin-bottom: ${spacing.large};
`;
