import React from 'react';
import styled from 'styled-components';

import { Icon, ClearButton } from '../../atoms';
import { palette } from '../../../style';

export const PokeButton = styled((props) => (
  <ClearButton {...props}>
    <Icon icon="paper-plane" size={props.size || 2} color={props.color} />
  </ClearButton>
))`
  color: ${palette.text};
`;
