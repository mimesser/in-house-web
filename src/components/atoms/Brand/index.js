import React from 'react';
import styled from 'styled-components';

import { spacing } from '../../../style';

export const Brand = styled(({ className }) => (
  <span className={className}>
    <b>in-house</b> | movement
  </span>
))`
  word-spacing: ${spacing.xs};
  text-transform: none;
`;
