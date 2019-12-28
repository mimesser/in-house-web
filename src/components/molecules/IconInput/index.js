import React from 'react';
import styled from 'styled-components';

import { Icon, Input } from '../../atoms';
import { spacing, palette } from '../../../style';
import { withForwardedRef } from '../../withForwardedRef';

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

// TODO: move functionality to regular input, consolidate icon options

export const IconInput = styled(
  withForwardedRef(({ className, icon, forwardedRef, ...inputProps }) => (
    <Wrap className={className} ref={forwardedRef}>
      <Input {...inputProps} />
      {typeof icon === 'string' ? <Icon icon={icon} /> : icon}
    </Wrap>
  )),
)``;
