import React from 'react';
import styled from 'styled-components';

import { spacing, calcRem } from '../../../style';

export const Break = styled.div`
  height: ${calcRem('6px')};
  width: ${calcRem('106px')};
  background-color: currentColor;
  margin: ${spacing.xl} 0 ${spacing.lg};
`;
