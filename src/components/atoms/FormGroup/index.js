import styled from 'styled-components';
import { fontSize, spacing, palette } from '../../../style';

export const FormGroup = styled.div`
  margin-top: ${({ marginless }) => (marginless ? 0 : spacing.large)};
  color: ${palette.textLight};
  :focus-within {
    color: ${palette.textDark};
  }

  > ${({ highlightValue }) => (highlightValue ? 'p' : 'label')} {
    font-size: ${fontSize.large};
    color: ${palette.textDark};
  }

  > label {
    color: ${({ highlightValue }) => highlightValue && palette.secondary};
  }

  > p {
    margin: 0;
  }
`;
