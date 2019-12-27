import styled from 'styled-components';

import { FormGroup } from '../../atoms';
import { fontSize, fontWeight, palette } from '../../../style';

export const Hint = styled(FormGroup)`
  font-size: ${fontSize.md};
  font-weight: ${fontWeight.bold};
  color: ${palette.black};
`;
