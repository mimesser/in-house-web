import React from 'react';

import styled, { keyframes } from 'styled-components';

import Text from './Text';

const HalfPanel = styled.div`
  position: ${({ position }) => (position === 'top' ? 'relative' : 'absolute')};
  overflow: hidden;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Panel = ({ position, textColor, value }) => (
  <HalfPanel position={position}>
    <Text position={position} color={textColor}>
      {value}
    </Text>
  </HalfPanel>
);

const FlipIn = keyframes`
  0% {
    transform: rotateX(-90deg);
  }
  50% {
    transform: rotateX(-90deg);
  }
  100% {
    transform: rotateX(0deg);
  }
`;

const FlipOut = keyframes`
  0% {
    transform: rotateX(0deg);
  }
  50% {
    transform: rotateX(90deg);
  }
  100% {
    transform: rotateX(90deg);
  }
`;

const HalfFlipPanel = styled(HalfPanel)`
  position: absolute;
  animation: ${({ direction }) => (direction === 'in' ? FlipIn : FlipOut)} linear
    ${({ duration }) => `${duration}s`};
  animation-fill-mode: forwards;
  background: ${({ color, direction }) =>
    direction === 'out'
      ? `linear-gradient(${color} 50%, transparent 50%)`
      : `linear-gradient(transparent 50%, ${color} 50%)`};
  opacity: 1;
  z-index: 2;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const FlipPanel = ({ background, direction, duration, position, textColor, value }) => (
  <HalfFlipPanel direction={direction} duration={duration} color={background} position={position}>
    <Text position={position} color={textColor}>
      {value}
    </Text>
  </HalfFlipPanel>
);

export default Panel;
