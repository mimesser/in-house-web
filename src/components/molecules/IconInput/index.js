import React from 'react';
import styled from 'styled-components';

import { Input } from '../../atoms';
import { spacing } from '../../../style';

const Wrap = styled.div`
   position: relative;
   display: flex;
   align-items: center;

   > :not(:first-child) {
      position: absolute;
      right: ${spacing.small};
   }
`;

export const IconInput = ({ icon, ...inputProps }) => (
   <Wrap>
      <Input {...inputProps} />
      {icon}
   </Wrap>
);
