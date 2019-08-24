import styled from 'styled-components';

import { fontSize, spacing, palette } from '../../../style';

export const Status = styled.div`
  margin-top: ${spacing.tiny};
  display: flex;
`;

export const CharLimit = styled.span`
  transition: color 0.5s;
  font-size: ${fontSize.tiny};
  margin-left: auto;
`;

export const Error = styled.span`
  color: ${palette.primary};
  font-size: ${fontSize.small};
`;
