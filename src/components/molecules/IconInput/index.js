import React from 'react';
import styled from 'styled-components';

import { Input } from '../../atoms';
import { spacing, palette } from '../../../style';

const Wrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  color: ${palette.primary};

  :focus-within,
  :hover {
    color: ${palette.primary};
  }

  > :not(:first-child) {
    position: absolute;
    right: ${spacing.lg};
  }
`;

export const IconInput = styled(({ className, icon, ...inputProps }) => (
  <Wrap className={className}>
    <Input {...inputProps} />
    {icon}
  </Wrap>
))``;
