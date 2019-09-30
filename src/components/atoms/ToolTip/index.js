import React from 'react';
import styled from 'styled-components';

import { palette, spacing } from '../../../style';
import { withForwardedRef } from '../../withForwardedRef';

const TIP_SIZE = '10px';

const Wrapper = styled.div`
  position: 'relative';
`;

// A tooltip that displays from the top direction only
const ToolTip = styled.div`
  position: absolute;
  transform: translateY(-100%);
  display: ${({ open }) => (open ? 'block' : 'none')};

  padding: ${spacing.medium};
  background-color: ${palette.primaryLight};

  margin-top: calc(-${TIP_SIZE} + -${spacing.tiny});

  ::after {
    content: '';
    position: absolute;
    bottom: -${TIP_SIZE};

    left: calc(${TIP_SIZE} + ${spacing.tiny});

    border-width: ${TIP_SIZE} ${TIP_SIZE} 0 ${TIP_SIZE};
    border-style: solid;
    border-color: ${palette.primaryLight} transparent transparent transparent;
  }
`;

export default withForwardedRef(({ children, forwardedRef, open, ...props }) => (
  <Wrapper>
    <ToolTip {...props} ref={forwardedRef} open={open}>
      {children}
    </ToolTip>
  </Wrapper>
));
