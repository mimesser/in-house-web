import styled from 'styled-components';

import { calcRem, fontSize, spacing } from '../../../theme';
import { Button, IconButton } from '../../atoms/Button';

export const QuestionForm = styled.div`
   padding: 5rem ${spacing.large};
   display: flex;
   flex-direction: column;
   flex: 1;
`;
export const HouseTitle = styled.header`
   font-size: ${fontSize.large};
   color: ${({ theme: { palette } }) => palette.grayscale[1]};
`;
export const Question = styled.p`
   font-size: 2rem;
   margin: ${spacing.large} 0;
`;
export const Answer = styled.form`
   > div {
      display: flex;
   }
   input {
      max-width: calc(100% - ${calcRem('60px')});
   }
   margin-bottom: ${spacing.xLarge};
`;
export const SubmitButton = styled(IconButton).attrs({
   type: 'submit',
})`
   transition: opacity 0.5s;
   opacity: ${({ visible }) => (visible ? 1 : 0)};
   margin-left: ${spacing.medium};
`;

export const ChangeButton = styled(Button)`
   border-color: ${({ theme: { palette } }) => palette.white};
   margin: auto auto 0 0;
`;

// TODO: should be part of InputFiled
export const ValidationError = styled.span`
   color: ${({ theme: { palette } }) => palette.danger[1]};
   font-size: ${fontSize.small};
   margin-top: ${spacing.tiny};
`;

export const Confirmation = styled.div`
   margin: auto;
   font-size: 12rem;
   font-family: 'Lato', sans-serif;
   letter-spacing: 2rem;
   transform: rotate(90deg);
`;
