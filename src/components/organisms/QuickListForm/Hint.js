import styled from 'styled-components';

import { FormGroup } from '../../atoms';
import { fontSize, font, palette } from '../../../style';

export const Hint = styled(FormGroup)`
  font-size: ${fontSize.md};
  ${font.bold};
  color: ${palette.black};
`;
