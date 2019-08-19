import styled from 'styled-components';

import { palette, spacing, fontSize, fontWeight } from '../../../style';
import { IconButton } from '../../atoms';
import { Dial } from '../../molecules';

export const ItemDate = styled.div`
   color: ${palette.textLight};
   font-size: ${fontSize.tiny};
   margin-bottom: ${spacing.large};
`;

export const ItemTitle = styled.div`
   text-transform: lowercase;
   font-size: ${fontSize.xLarge};
   font-weight: ${fontWeight.bolder};
   // keep space for 'you rated'
   margin-bottom: ${({ keepSpace }) => (keepSpace ? '3.25rem' : spacing.small)};
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
   > div:nth-child(2) {
      flex: 1;
   }
`;

export const Layout = styled.div`
   flex: 1;
   display: flex;
   flex-direction: column;
   overflow: hidden;

   ${Dial} {
      margin-top: -100px;
      margin-left: -100px;
   }
`;

export const SubTitle = styled.div`
   font-size: ${fontSize.large};
   fontWeight: ${fontWeight.bolder}
   color: ${palette.textLight};
   margin-bottom: ${spacing.large};
`;
