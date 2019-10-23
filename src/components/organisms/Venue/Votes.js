import React from 'react';
import styled from 'styled-components';

import { fontSize, spacing, lineHeight } from '../../../style';
import { Number, Icon } from '../../atoms';

export const Votes = styled(({ count, iconSize = 0.8, ...rest }) => (
  <Number {...rest}>
    <Icon icon="users" size={iconSize} />
    <span>{count || 0}</span>
  </Number>
))`
  display: inline-block;
  font-size: ${fontSize.small};
  span {
    margin-left: ${spacing.nano};
    line-height: ${lineHeight.tiny};
    vertical-align: middle;
  }
`;
