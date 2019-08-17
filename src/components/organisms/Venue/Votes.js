import React from 'react';
import styled from 'styled-components';

import { Users } from 'styled-icons/feather';
import { fontSize } from '../../../style';
import { Number } from '../../atoms';

export const Votes = styled(({ count, iconSize = 16, ...rest }) => (
   <Number {...rest}>
      <Users size={iconSize} /> <span>{count || 0}</span>
   </Number>
))`
   display: inline-block;
   font-size: ${fontSize.small};
   span {
      vertical-align: bottom;
   }
`;