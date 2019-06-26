import styled from 'styled-components';
import { fontSize, spacing, palette } from '../../../style';

export const FormGroup = styled.div`
   margin-top: ${spacing.large};
   > label {
      ${({ readonly }) => readonly && `color: ${palette.secondary}`};

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
