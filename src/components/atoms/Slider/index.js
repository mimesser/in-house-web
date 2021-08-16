import React from 'react';
import styled, { keyframes } from 'styled-components';

import { theme } from '../../../style';

const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

const SliderContainer = styled.div`
  position: relative;
  display: inline-block;
  background-color: ${theme.colors.lightGray};
  user-select: none;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  z-index: auto;
`;

const Sliding = keyframes`
  0% {
    left:-185px;
  }
  100% {
    left:100%;
  }
`;

const GradientWrapper = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  height: 8px;
`;

const GradientFill = styled.div.attrs((props) => ({
  style: {
    animationDelay: `${props.delay}s`,
  },
}))`
  position: relative;
  width: 185px;
  height: 8px;
  background: radial-gradient(38.33% 51071.18% at 50% 50%, #bfbfbf 0%, #e0e0e0 86.98%);
  animation: ${Sliding} 2s ease-in-out infinite;
  animation: ${({ selectedTag }) => selectedTag && 'none'};
`;

const SliderFilled = styled.div`
  width: 100%;
  height: 100%;
  padding: 0;
  position: absolute;
  background-color: ${({ fillColor }) => fillColor};
  user-select: 'none';
  box-sizing: 'border-box';
  top: 0;
  z-index: auto;
  transform-origin: left;
  -webkit-transform-origin-x: left;
  transition: transform 0.2s ease-in-out;
`;

const BaseSlider = ({ x, fillColor, selectedTag, ...props }) => {
  const setWidth = {
    transform: `scaleX(${x / 10})`,
  };

  return (
    <SliderContainer disabled>
      {x ? (
        <SliderFilled fillColor={fillColor} style={setWidth} />
      ) : (
        <GradientWrapper>
          <GradientFill delay={Math.random()} selectedTag={selectedTag} />
        </GradientWrapper>
      )}

      {props.children}
    </SliderContainer>
  );
};

BaseSlider.defaultProps = {
  disabled: false,
  x: 50,
  min: 0,
  max: 10,
  step: 0.1,
};

export const Slider = styled(BaseSlider)``;
