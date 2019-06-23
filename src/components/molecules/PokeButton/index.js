import React from 'react';
import styled from 'styled-components';
import { PaperPlane } from 'styled-icons/fa-solid';

import { IconButton } from '../../atoms';

const Icon = styled(PaperPlane).attrs({ size: 16 })`
   transform: rotate(28deg);
`;

export const PokeButton = styled(props => (
   <IconButton {...props}>
      <Icon />
   </IconButton>
))`
   color: ${({ theme: { palette } }) => palette.grayscale[3]};
`;
