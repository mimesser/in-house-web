import React from 'react';
import styled from 'styled-components';
import { PaperPlane } from 'styled-icons/fa-solid';

import { IconButton } from '../../atoms';
import { palette } from '../../../style';

const Icon = styled(PaperPlane).attrs({ size: 16 })`
   transform: rotate(28deg);
   color: ${palette.secondaryDark};
`;

export const PokeButton = styled(props => (
   <IconButton {...props}>
      <Icon />
   </IconButton>
))`
   color: ${palette.text};
`;
