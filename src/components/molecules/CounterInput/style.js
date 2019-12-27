import styled from 'styled-components';

import { fontSize, spacing, palette } from '../../../style';

export const Status = styled.div`
  margin-top: ${spacing.sm};
  display: flex;
`;

export const SubText = styled.span`
  color: ${palette.darkGray};
`;

export const CharLimit = styled.span`
  color: ${palette.gray};
  margin-left: auto;
`;

export const Error = styled.span`
  color: ${palette.primary};
  font-size: ${fontSize.sm};
`;
