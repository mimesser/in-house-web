import React from 'react';

import styled from 'styled-components';
import { fontSize, font, palette } from '../../../style';

const Text = styled.div`
  background: ${({ position, color }) =>
    position === 'top'
      ? `linear-gradient(${color} 50%, transparent 50%)`
      : `linear-gradient(transparent 50%, ${color} 50%)`};
  background-clip: text;
  -webkit-background-clip: text;
  text-fill-color: transparent;
  -webkit-text-fill-color: transparent;

  word-break: keep-all;
  sup {
    font-size: 50%;
    top: -1.5rem;
    left: -0.5rem;
  }

  color: ${({ color }) => color};
  ${font.bold};
`;

const TextComponent = ({ children, color, position }) => (
  <Text position={position} color={color}>
    {children}
  </Text>
);

export default TextComponent;
