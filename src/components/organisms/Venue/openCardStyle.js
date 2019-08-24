import styled from 'styled-components';

import { palette, spacing, fontSize, fontWeight } from '../../../style';
import { IconButton } from '../../atoms';
import { Dial } from '../../molecules';

export const ItemDate = styled.div`
   color: ${palette.textLight};
   font-size: ${fontSize.tiny};
   margin-bottom: ${spacing.small};
`;

export const ItemTitle = styled.div`
   text-transform: lowercase;
   font-size: ${fontSize.xLarge};
   font-weight: ${fontWeight.primary};
   // keep space for 'you rated'
   margin-bottom: ${({ keepSpace }) => (keepSpace ? '3.25rem' : spacing.small)};
`;

export const VoteButton = styled(IconButton)`
   color: ${({ selected }) => (selected ? palette.textDark : palette.textLight)};
   &[disabled] {
      color: ${palette.textUltraLight};
   }
`;

export const VoteArea = styled.div`
   display: flex;
   flex-direction: column;

   > div:first-child {
      flex: 1;
      margin-top: ${spacing.large};
   }

   > div:nth-child(2) {
      flex: 0;
      margin-top: ${spacing.xxLarge};

      ${VoteButton} {
         &:last-child {
            margin-left: ${spacing.large};
         }
      }
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
