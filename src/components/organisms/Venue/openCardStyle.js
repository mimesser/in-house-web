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
  margin-top: ${spacing.xxxLarge};
  &[disabled] {
    color: ${palette.textUltraLight};
  }
  &:last-child {
    margin-left: ${spacing.large};
  }
`;

export const Layout = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-top: ${spacing.xxLarge};

  ${Dial} {
    margin-top: -100px;
    margin-left: -100px;
  }
`;

export const SubTitle = styled.div`
   font-size: ${fontSize.large};
   font-weight: ${fontWeight.bolder}
   color: ${palette.textLight};
   margin-bottom: ${spacing.large};
`;
