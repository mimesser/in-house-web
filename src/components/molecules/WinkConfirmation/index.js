import React from 'react';
import styled from 'styled-components';

import { palette, cover } from '../../../style';
import { Icon } from '../../atoms';

export const WinkConfirmation = styled.div.attrs(props => ({
  children: <Icon className="winky-confirmation-icon" size={props.size || 15} icon="winky-circle" />,
}))`
  .winky-confirmation-icon {
    & > svg > path {
      fill: ${palette.primary};
    }
  }

  // TODO:
  ${cover()};
  background-color: ${palette.primary};
  color: ${palette.mediumGray};
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
