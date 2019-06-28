import styled from 'styled-components';

import { calcRem, fontSize, spacing, palette, panelBoxShadow } from '../../../../style';
import { Button, Heading } from '../../../atoms';
import { Patent } from '../../../molecules';

export const Main = styled.div`
   padding: ${spacing.large};

   ${Patent} {
      font-size: ${fontSize.tiny};
   }

   ${Heading} {
      margin-bottom: ${spacing.xLarge};
   }
`;

export const Name = styled.div`
   text-transform: uppercase;
   color: ${palette.textDark};
   margin-bottom: ${spacing.medium};
`;

export const Commands = styled.div`
   position: relative;
   padding: ${spacing.large} 0;
   display: flex;
   justify-content: space-around;
   margin-top: auto;
   background-color: ${palette.white};
   border-top: 1px solid ${palette.secondary};
   ${panelBoxShadow};

   ${Button} {
      width: 40%;
      margin: 0 ${spacing.small};
   }

   // progress bar
   :before {
      position: absolute;
      top: ${calcRem('-3.5px')};
      left: 0;
      content: '';
      height: ${calcRem('2px')};
      background-color: ${palette.text};
      width: ${({ step }) => step * 25}%;
   }
`;
