import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import isNumber from 'lodash/isNumber';

import { CircleSlider, NumberLarge, NumberSmall, Icon, Slider, SlidingValue } from '../../atoms';
import { fontSize, font, palette, theme, appColors } from '../../../style';

const FONT_RATIO = 3.6;

const Title = styled.div`
  position: absolute;
  display: flex;
  margin-left: 42px;
  top: 35%;

  height: 100%;
  ${font.bold};
  pointer-events: none;
  user-select: none; /* supported by Chrome and Opera */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
`;

const Expand = keyframes`
  0% {
    height: 35px;
    background-color: ${palette.lightGrey};
    color:  ${palette.black};
  }
  100% {
    height: 72px;
    background-color: ${palette.black};
    color:  ${palette.white};

    font-size: 18px;
  }
`;

const Colapse = keyframes`
  0% {

    height: 72px;
    background-color: ${palette.black};
    color:  ${palette.white};
  }
  100% {
    height: 35px;
    background-color: ${palette.lightGrey};
    color:  ${palette.black};
    font-size: 14px;
  }
`;

const Wrapper = styled.div`
  margin-top: 2px;
  position: relative;
  background-color: #e0e0e0;
  width: 100%;
  height: 35px;
  border-bottom: 1px solid #e0e0e0;
  animation: ${({ expanded, ...props }) => (expanded === true ? Expand : Colapse)} ease-in-out
    ${({ duration }) => `${duration}s`};
  animation-fill-mode: forwards;
  background: ${({ expanded }) => (expanded === true ? theme.colors.black : palette.mediumGrey)};
`;
const Dot = styled(({ size, padd, ...rest }) => <NumberLarge {...rest}>.</NumberLarge>)`
  position: relative;
  top: -0.2em;
  transform: translate(50%, -0%);
  ${font.light};
  color: ${({ expanded }) => (expanded === true ? palette.white : palette.black)};
  margin-left: ${({ expanded }) => (expanded === true ? -1 : -0.9)}em;

  font-size: ${({ expanded }) => (expanded === true ? 32 : 24)}px;
`;

const SlidingWrapper = styled.div`
  width: 70px;
  height: 54px;
  pointer-events: none;
  margin-top: ${({ expanded }) => (expanded === true ? '-52px' : '-32px')};
  margin-left: auto;
  z-index: 11;
  padding-top: 4px;
`;

export const Indicator = styled(({ count, iconSize = 0.75, color, ...rest }) => (
  <Icon {...rest} icon="dot" size={iconSize} color={color} />
))`
  display: flex;
  justify-content: center;
  color: ${({ color }) => color};
  svg {
    padding: 0 3px 0 0;
  }
  opacity: 1;
  padding: 0 !important;
  position: relative;
  margin: auto;
  height: 100%;
  margin-left: 21px;
  transform: translate(-50%, -0%);

  left: ${(props) => `${props.percentage}%`};
`;

const renderValue = (value, decimal) => {
  if (!isNumber(value)) {
    return null;
  }

  if (decimal) {
    return value.toFixed(1);
  }

  return value;
};

const BaseRateCategory = ({
  valueColor,
  category: { name = 'rate & appreciation', color, id } = {},
  readonly,
  expanded,
  value,
  onClick,

  ...sliderProps
}) => {
  const { readonly: decimal, size, padd } = sliderProps;

  const [isExpanded, setExpanded] = useState(expanded);

  if (expanded !== isExpanded) {
    setExpanded(expanded);
  }

  function preventDefault(e) {
    if (e.cancelable) {
      e.preventDefault();
    }
  }

  function handleChange(userRate) {
    setUserValue(userRate);
    if (onChange) {
      onChange(userRate);
    }
  }
  return (
    <>
      <Wrapper
        expanded={isExpanded}
        duration={0.3}
        onClick={() => {
          setExpanded(!isExpanded);
          if (onClick) {
            onClick();
          }
        }}
      >
        <Title
          expanded={isExpanded}
          onClick={(e) => {
            preventDefault(e);
            setExpanded(!isExpanded);
            if (onClick) {
              onClick();
            }
          }}
        >
          {name}
        </Title>
        <Indicator color={appColors[color]} iconSize={isExpanded ? 1.5 : 0.75} />
        <SlidingWrapper expanded={isExpanded}>
          <SlidingValue
            value={`${Math.floor(value * 10)}`}
            fontSize={isExpanded ? fontSize.md : fontSize.sm}
            textColor={isExpanded ? palette.white : palette.black}
          >
            <Dot size={isExpanded ? 50 : 25} padd={padd} expanded={isExpanded} />
          </SlidingValue>
        </SlidingWrapper>
      </Wrapper>
      {sliderProps.children}
    </>
  );
};

export const RateCategory = styled(BaseRateCategory)``;
