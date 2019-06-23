import styled from 'styled-components';
import { fontSize, spacing } from '../../../theme';

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
`;
