import styled from 'styled-components';

import { fontWeight, spacing, palette } from '../../../style';

export const FormGroup = styled.div`
  margin-top: ${({ marginless }) => (marginless ? 0 : spacing.xl)};
  color: ${palette.primary};
  :focus-within {
    color: ${palette.black};
  }

  > label {
    text-transform: uppercase;
    color: ${palette.gray};
  }

  > p {
    margin-top: ${spacing.md};
    font-weight: ${fontWeight.bold};
  }
`;
