import styled from 'styled-components';

import { calcRem, fontSize, spacing, palette } from '../../../../style';
import { Button } from '../../../atoms';

export const Main = styled.div`
   padding: ${spacing.medium};
`;

export const Name = styled.div`
   text-transform: uppercase;
   font-size: ${fontSize.medium};
   margin-top: ${spacing.large};
`;

export const Commands = styled.div`
   position: relative;
   padding: ${spacing.large} 0;
   display: flex;
   justify-content: space-around;
   margin-top: auto;
   background-color: ${palette.white};
   ${Button} {
      width: 40%;
      margin: 0 ${spacing.small};
   }

   // progress bar
   :before {
      position: absolute;
      top: ${calcRem('-2px')};
      left: 0;
      content: '';
      height: ${calcRem('2px')};
      background-color: ${palette.text};
      width: ${({ step }) => step * 25}%;
   }
`;
