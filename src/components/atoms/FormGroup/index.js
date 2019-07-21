import styled from 'styled-components';
import { fontSize, spacing, palette } from '../../../style';

export const FormGroup = styled.div`
   margin-top: ${spacing.large};

   > label {
      ${({ readonly }) => readonly && `color: ${palette.secondary}`};

      font-size: ${fontSize.large};
      color: ${palette.textDark};
   }

   > p {
      margin: 0;
   }
`;
