import React from 'react';
import styled from 'styled-components';

import { palette } from '../../../style';
import { Icon } from '../../atoms';

export const WinkConfirmation = styled.div.attrs(props => ({
  children: <Icon size={props.size || 15} icon="winky-circle" />,
}))`
  background-color: ${palette.primary};
  color: ${palette.mediumGray};
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
