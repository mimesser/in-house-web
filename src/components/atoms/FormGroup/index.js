import styled from 'styled-components';
import { fontSize, spacing, palette } from '../../../style';

export const FormGroup = styled.div`
  margin-top: ${({ marginless }) => (marginless ? 0 : spacing.large)};
  color: ${palette.textLight};
  :focus-within {
    color: ${palette.textDark};
  }

  > label {
    ${({ readonly }) => readonly && `color: ${palette.secondary}`};

    font-size: ${fontSize.large};
    color: ${palette.textDark};
  }

  > p {
    margin: 0;
  }
`;
