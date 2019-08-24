import React from 'react';
import styled from 'styled-components';

import { palette } from '../../../style';
import { Icon } from '../../atoms';

export const WinkConfirmation = styled.div.attrs({
  children: <Icon size={10} icon="winky" />,
})`
  background-color: ${palette.primary};
  color: ${palette.primary};
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
