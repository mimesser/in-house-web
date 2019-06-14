import styled from 'styled-components';

import { calcRem, fontSize, spacing } from '../../../../theme';
import { Button } from '../../../atoms';
import { Patent } from '../../../molecules';

export const Main = styled.div`
   padding: ${spacing.medium};
   ${Patent} {
      font-size: ${fontSize.tiny};
   }
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
   background-color: ${({ theme: { palette } }) => palette.white};
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
      background-color: ${({ theme: { textColors } }) => textColors.primary};
      width: ${({ step }) => step * 25}%;
   }
`;

export const CharLimit = styled.div`
   transition: color 0.5s;
   color: ${({ reached, theme: { palette, textColors } }) => (reached ? palette.danger[0] : textColors.primary)};
`;

// TODO: extract? reusable?
export const FormGroup = styled.div`
   margin-top: ${spacing.large};
   > label {
      ${({ readonly, theme: { palette } }) => readonly && `color: ${palette.grayscale[1]}`};

      > * {
         margin-top: ${spacing.small};
      }
   }
   > p {
      margin-top: ${spacing.tiny};
      margin-bottom: 0;
      font-size: ${fontSize.medium};
   }

   ${CharLimit} {
      font-size: ${fontSize.small};
      margin-top: ${spacing.tiny};
      text-align: right;
   }
`;
