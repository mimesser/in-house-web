import styled from 'styled-components';

import { font, spacing, palette } from '../../../style';

export const FormGroup = styled.div`
  margin-top: ${({ marginless }) => (marginless ? 0 : spacing.xl)};
  color: ${({ inverse }) => (inverse ? palette.white : palette.primary)};
  :focus-within {
    color: ${palette.black};
  }

  > label {
    text-transform: uppercase;
    color: ${palette.gray};
  }

  > p {
    margin-top: ${spacing.md};
    ${font.bold};
  }
`;
