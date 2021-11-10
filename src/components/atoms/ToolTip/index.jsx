import React from 'react';
import styled from 'styled-components';

import { palette, spacing } from '../../../style';
import { withForwardedRef } from '../../withForwardedRef';

const TIP_SIZE = '10px';

const Wrapper = styled.div`
  position: relative;
`;

// TODO: in the future, use something like popper.js for these types of things

// A tooltip that displays from the top direction only
const ToolTip = styled.div`
  position: absolute;
  transform: translateY(-100%);
  display: ${({ open }) => (open ? 'block' : 'none')};

  padding: ${spacing.md};
  background-color: ${palette.gray};

  margin-top: calc(-${TIP_SIZE} + -${spacing.xs});

  ::after {
    content: '';
    position: absolute;
    bottom: -${TIP_SIZE};

    left: calc(${TIP_SIZE} + ${spacing.xs});

    border-width: ${TIP_SIZE} ${TIP_SIZE} 0 ${TIP_SIZE};
    border-style: solid;
    border-color: ${palette.gray} transparent transparent transparent;
  }
`;

export default withForwardedRef(({ children, forwardedRef, open, ...props }) => (
  <Wrapper>
    <ToolTip {...props} ref={forwardedRef} open={open}>
      {children}
    </ToolTip>
  </Wrapper>
));
