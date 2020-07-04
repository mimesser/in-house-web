import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import { theme, palette } from '../../../style';
// import { Container, SliderLabel } from './style';
import { getClientPosition } from './utils';

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
`;

const SliderKnob = styled.div`
  position: relative;
  display: block;
  width: 20px;
  height: 100%;
  transform: translate(-50%, 0%);
  left: ${(props) => props.percentage};
`;

const SliderFilled = styled.div`
  height: 100%;
  padding: 0;
  position: absolute;
  background-color: ${theme.colors.mediumGray};
  user-select: 'none';
  box-sizing: 'border-box';
  width: ${(props) => props.percentage};
  top: 0;
`;

const BaseSlider = ({ disabled, x, min, max, step, onChange, onSlideStart, onSlideEnd, onClick, ...props }) => {
  const container = useRef(null);
  const handle = useRef(null);
  const start = useRef({});
  const offset = useRef({});
  const [value, setValue] = useState(x);

  function getPosition() {
    const pos = ((value - min) / (max - min)) * 100;
    const left = clamp(pos, 0, 100);
    const top = 100;

    return { top, left };
  }

  function change(newValue) {
    if (!onChange) return;

    const { width, height } = container.current.getBoundingClientRect();

    const target = clamp(newValue, 0, width);
    const dx = (target / width) * (max - min);

    const x = (dx !== 0 ? parseInt(dx / step, 10) * step : 0) + min;

    setValue(x);
    onChange(x);
  }

  function handleMouseDown(e) {
    if (disabled) return;

    e.preventDefault();

    const clientPos = getClientPosition(e);
    const rect = container.current.getBoundingClientRect();

    change(clientPos.x - rect.left);

    const dom = handle.current;

    start.current = {
      x: dom.offsetLeft,
      y: dom.offsetTop,
    };

    offset.current = {
      x: clientPos.x,
      y: clientPos.y,
    };

    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchmove', handleDrag, { passive: false });
    document.addEventListener('touchend', handleDragEnd);
    document.addEventListener('touchcancel', handleDragEnd);
    if (onSlideStart) {
      onSlideStart();
    }
  }

  function getPos(e) {
    const clientPos = getClientPosition(e);
    const left = clientPos.x + start.current.x - offset.current.x;
    const top = clientPos.y + start.current - offset.current.y;

    return { left, top };
  }

  function handleDrag(e) {
    if (disabled) return;

    e.preventDefault();
    const { left, top } = getPos(e);
    change(left);
  }

  function handleDragEnd(e) {
    if (disabled) return;
    e.preventDefault();

    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleDragEnd);

    document.removeEventListener('touchmove', handleDrag, {
      passive: false,
    });
    document.removeEventListener('touchend', handleDragEnd);
    document.removeEventListener('touchcancel', handleDragEnd);

    if (onSlideEnd) {
      onSlideEnd();
    }
  }

  function handleClick(e) {
    if (disabled) return;

    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    const clientPos = getClientPosition(e);
    const rect = container.current.getBoundingClientRect();

    change(clientPos.x - rect.left);

    if (onClick) onClick(e);
  }

  const pos = getPosition();

  const percentage = `${pos.left}%`;
  return (
    <SliderContainer {...props} disabled ref={container} onClick={handleClick}>
      <SliderFilled percentage={percentage} />

      <SliderKnob
        percentage={percentage}
        ref={handle}
        onTouchStart={handleMouseDown}
        onMouseDown={handleMouseDown}
        onClick={function (e) {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
        }}
      />

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
