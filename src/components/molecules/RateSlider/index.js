import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import isNumber from 'lodash/isNumber';

import { CircleSlider, NumberLarge, NumberSmall, Icon, Slider, SlidingValue } from '../../atoms';
import { fontSize, font, palette, theme } from '../../../style';

const FONT_RATIO = 3.6;

const SuperScriptDecimalSpan = styled.span`
  vertical-align: super;
  font-size: 0.5em;
  margin-left: -2px;
`;

const Dot = styled(({ size, padd, ...rest }) => <NumberLarge {...rest}>.</NumberLarge>)`
  ${font.light};
  color: ${({ color }) => color};
  margin-left: -1em;
  font-size: ${({ size, padd }) => (size - padd) / FONT_RATIO}px;
  ${font.bold};
`;

const Title = styled.div`
  position: relative;
  margin-left: 24px;
  // background-color: red;
  top: 2.5em;
  color: ${({ color }) => color};
  ${font.bold};
  font-size: ${fontSize.md};
  z-index: 2;
  pointer-events: none;
  user-select: none; /* supported by Chrome and Opera */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
`;

const Wrapper = styled.div`
  position: relative;
  background-color: #f9f9f9;
  width: 100%;
  height: 97px;
  border-bottom: 1px solid #e0e0e0;
`;

const TouchHelper = styled.div`
  position: absolute
  width: 100%;
  height: 100vh;
  border-bottom: 1px solid #e0e0e0;
  z-index: -10;
  margin-top: -50vh;
`;

export const Votes = styled(({ count, iconSize = 1, userRate, ...rest }) => (
  <NumberSmall {...rest}>
    <Icon icon="users" size={iconSize} /> <span className="count">{count || 0}</span>{' '}
    {userRate ? <span className="divide">{'   /'}</span> : <span className="divide">{' insiders'}</span>}
  </NumberSmall>
))`
  position: relative;
  font-size: ${fontSize.sm};
  display: flex;
  color: ${theme.colors.mediumGray};
  width: 120px;
  top: -2em;
  margin-left: auto;
  top: 10px;
  pointer-events: none;
  svg {
    padding: 0 3px 0 0;
  }
  .divide {
    margin-left: 10px;
  }
  .count {
    color: ${theme.colors.darkGray};
  }
`;

const SlidingWrapper = styled.div`
  width: 70px;
  height: 54px;
  pointer-events: none;
  margin-top: -16px;
  margin-left: auto;
  z-index: 11;
`;

const Expand = keyframes`
  0% {
    height: 8px;
    margin: 24px;
    opacity: 1;
  }
  50% {
    margin-top: -50px;
    height: 40%;
  }
  100% {
    margin: 0px;
    margin-top: -75px;
    height: 100%;
    opacity: 0.5;
  }
`;

const Colapse = keyframes`
  0% {
    margin: 0px;
    margin-top: -97px;
    height: 100%;

    opacity: 0.5;
  }
  50% {
      height: 40%;
    }
  }
  100% {
    margin: 25px;
    margin-top: -50px;
    height: 8px;
    margin-left: 24px;
    opacity: 1;
  }
`;

const SliderWrapper = styled.div`
  position: relative;
  width: auto;
  height: 8px;
  margin: 25px;
  margin-top: 0px;
  animation: ${({ expanded }) => (expanded === true ? Expand : Colapse)} linear ${({ duration }) => `${duration}s`};
  background: ${({ expanded }) => (expanded === true ? theme.colors.darkGray : theme.colors.lightGray)}}
  animation-fill-mode: forwards;
`;

export const Indicator = styled(({ count, iconSize = 0.75, ...rest }) => (
  <Icon {...rest} icon="radio-marked" size={iconSize} />
))`
  display: flex;
  justify-content: center;
  color: ${palette.black};
  svg {
    padding: 0 3px 0 0;
  }
  padding: 0 !important;
  position: relative;
  display: block;
  width: 20px;
  height: 100%;

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

const BaseRateSlider = ({
  value: initialValue = null,
  voteCount = 0,
  valueColor,
  title = 'rate & appreciation',
  userRate = null,
  readonly,
  expanded,
  onChange,
  ...sliderProps
}) => {
  const { readonly: decimal, size, padd } = sliderProps;
  const [value, setValue] = useState(initialValue);
  const [userValue, setUserValue] = useState(userRate);
  const [isExpanded, setExpanded] = useState(expanded);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  if (expanded !== isExpanded) {
    setExpanded(expanded);
  }

  function preventDefault(e) {
    console.log('# preenting default: ', e.cancelable);
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
        onClick={() => {
          setExpanded(!isExpanded);
        }}
      >
        <Title
          onClick={(e) => {
            preventDefault(e);
            setExpanded(!isExpanded);
          }}
          onTouchStart={preventDefault}
          onMouseDown={preventDefault}
        >
          {title}
        </Title>
        <Votes count={voteCount} userRate={userRate} />
        <SlidingWrapper>
          {value && userValue && (
            <SlidingValue fontSize={fontSize.lg} value={`${Math.floor((isExpanded ? userValue : value) * 10)}`}>
              <Dot size={140} padd={padd} color={valueColor} />
            </SlidingValue>
          )}
        </SlidingWrapper>
        {/* {isExpanded && <TouchHelper />} */}
        <SliderWrapper expanded={isExpanded} duration={0.3}>
          <Slider
            onChange={handleChange}
            x={(isExpanded && userValue) || (!isExpanded && value)}
            disabled={readonly || !isExpanded}
          >
            {userValue && !isExpanded && <Indicator percentage={userValue * 10} />}
          </Slider>
        </SliderWrapper>
      </Wrapper>
      {sliderProps.children}
    </>
  );
};

BaseRateSlider.defaultProps = {
  size: 300,
  padd: 0,
};

export const RateSlider = styled(BaseRateSlider)``;
