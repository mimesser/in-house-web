import React from 'react';
import styled from 'styled-components';

import { Icon, IconButton } from '../../atoms';
import { palette } from '../../../style';

export const PokeButton = styled(props => (
  <IconButton {...props}>
    <Icon icon="paper-plane" size={2} color="secondaryDark" />
  </IconButton>
))`
  color: ${palette.text};
`;
