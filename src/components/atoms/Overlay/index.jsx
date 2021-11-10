import React from 'react';
import styled from 'styled-components';
import Transition from 'react-transition-group/Transition';

import { OverlayWrap, overlayStyle } from './style';

const Overlay = ({ className, style, children, onClick }) => (
  <Transition timeout={100} appear in unmountOnExit>
    {(transition) => (
      <OverlayWrap {...{ className, style, transition }} onClick={onClick}>
        {children}
      </OverlayWrap>
    )}
  </Transition>
);

export default styled(Overlay)`
  ${overlayStyle};
`;
