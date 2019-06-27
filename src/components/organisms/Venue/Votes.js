import React from 'react';
import styled from 'styled-components';

import { Users } from 'styled-icons/feather';
import { fontSize } from '../../../style';

export const Votes = styled(({ count, iconSize = 20, ...rest }) => (
   <div {...rest}>
      <Users size={iconSize} /> <span>{count || 0}</span>
   </div>
))`
   display: inline-block;
   font-size: ${fontSize.tiny};
   span {
      vertical-align: bottom;
   }
`;
