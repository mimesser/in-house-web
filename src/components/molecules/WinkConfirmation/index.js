import React from 'react';
import styled from 'styled-components';

import { palette, cover } from '../../../style';
import { Icon } from '../../atoms';

export const WinkConfirmation = styled.div.attrs((props) => ({
  children: <Icon size={props.size || 15} icon="winky-circle" />,
}))`
  ${cover()};
  background-color: ${palette.primary};
  color: ${palette.darkGray};
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
