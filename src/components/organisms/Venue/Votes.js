import React from 'react';
import styled from 'styled-components';

import { fontSize, spacing, lineHeight } from '../../../style';
import { NumberSmall, Icon } from '../../atoms';

export const Votes = styled(({ count, iconSize = 0.8, ...rest }) => (
  <NumberSmall {...rest}>
    <Icon icon="users" size={iconSize} />
    <span>{count || 0}</span>
  </NumberSmall>
))`
  display: inline-block;
  font-size: ${fontSize.sm};
  span {
    margin-left: ${spacing.xxs};
    line-height: ${lineHeight.xs};
    vertical-align: middle;
  }
`;
