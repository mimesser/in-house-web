import React from 'react';

import styled from 'styled-components';
import Panel, { FlipPanel } from './Panel';

const Character = styled.div`
  background: ${({ background }) => background};
  display: flex;
  justify-content: center;
  padding: 0.25em;
  position: relative;
  &:after {
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50%;
    z-index: 5;
    background: transparent;
  }
`;

const CharacterComponent = ({ background, characterWidth, prevValue, step, textColor, value }) => (
  <Character background={background} characterWidth={characterWidth}>
    <Panel position="top" background={background} textColor={textColor} value={value} />
    <Panel position="bottom" background={background} textColor={textColor} value={prevValue} />
    {prevValue !== value && (
      <FlipPanel
        direction="out"
        duration={step / 1000}
        position="top"
        background={background}
        textColor={textColor}
        value={prevValue}
      />
    )}
    {prevValue !== value && (
      <FlipPanel
        direction="in"
        duration={step / 1000}
        position="bottom"
        background={background}
        textColor={textColor}
        value={value}
      />
    )}
  </Character>
);

export default CharacterComponent;
