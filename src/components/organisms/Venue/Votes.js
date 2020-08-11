import React from 'react';
import styled from 'styled-components';

import { fontSize, spacing, palette } from '../../../style';
import { NumberSmall, Icon } from '../../atoms';

export const Votes = styled(({ count, iconSize = 0.8, inverse, ...rest }) => (
  <NumberSmall {...rest}>
    <Icon icon="users" size={iconSize} {...rest} />
    <span>{count || 0}</span>
  </NumberSmall>
))`
  display: inline-flex;
  align-items: center;
  font-size: ${fontSize.sm};
  span:last-of-type {
    margin-left: ${spacing.xs};
    color: ${({ inverse }) => (inverse ? palette.white : palette.primary)};
  }
`;
