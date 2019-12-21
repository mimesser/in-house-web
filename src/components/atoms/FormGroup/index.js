import styled from 'styled-components';
import { fontSize, spacing, palette } from '../../../style';

export const FormGroup = styled.div`
  margin-top: ${({ marginless }) => (marginless ? 0 : spacing.lg)};
  color: ${palette.primary};
  :focus-within {
    color: ${palette.black};
  }

  > ${({ highlightValue }) => (highlightValue ? 'p' : 'label')} {
    font-size: ${fontSize.large};
    color: ${palette.primary};
  }

  > label {
    color: ${({ highlightValue }) => highlightValue && palette.gray};
  }

  > p {
    margin: 0;
  }
`;
