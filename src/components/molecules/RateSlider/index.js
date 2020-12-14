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
  top: 2.2em;
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
  top: 30px;
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
  visibility: ${({ expanded }) => (expanded === true ? 'hidden' : 'visible')};
`;

const SlidingWrapper = styled.div`
  width: 70px;
  height: 54px;
  pointer-events: none;
  margin-top: ${({ expanded }) => (expanded === true ? '-16px' : '4px')};
  margin-left: auto;
  z-index: 11;
  padding-top: 4px;
`;

const Expand = keyframes`
  0% {
    height: 8px;
    margin: 24px;
    opacity: 1;
  }
  50% {
    margin-top: -40px;
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
    margin-top: -75px;
    height: 100%;
    opacity: 0.5;
  }

  100% {
    margin: 25px;
    margin-top: 0px;
    margin-bottom: 0px;
    height: 8px;
    margin-left: 24px;
    opacity: 1;
    padding:0px;
  }
`;

const SliderWrapper = styled.div`
  position: relative;
  width: auto;
  height: 8px;
  margin: 25px;
  margin-top: 0px;
  margin-bottom: 0px;
  top: ${({ expanded }) => (expanded === true ? '0' : '-20')}px;
  animation: ${({ expanded }) => (expanded === true ? Expand : Colapse)} ease-in-out ${({ duration }) => `${duration}s`};
  background: ${({ expanded }) => (expanded === true ? theme.colors.darkGray : palette.transparent)};
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
  onSlideStart,
  onSlideEnd,
  selectedTag,
  inProgress,
  ...sliderProps
}) => {
  const { readonly: decimal, size, padd, fillColor = palette.darkGray } = sliderProps;
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
      <Wrapper>
        <Title
          onTouchStart={preventDefault}
          onMouseDown={preventDefault}
        >
          {title}
        </Title>
        <Votes count={voteCount} userRate={userRate} expanded={isExpanded} />
        <SlidingWrapper expanded={isExpanded}>
          {(isExpanded || (userValue && value)) && (
            <SlidingValue
              fontSize={isExpanded ? fontSize.lg : fontSize.md}
              value={`${Math.floor((isExpanded ? userValue / 10 : value) * 10)}`}
              minLength={isExpanded ? 1 : 2}
            >
              {!isExpanded && <Dot size={isExpanded ? 140 : 80} padd={padd} color={valueColor} />}
            </SlidingValue>
          )}
        </SlidingWrapper>
        {/* {isExpanded && <TouchHelper />} */}
        <SliderWrapper expanded={isExpanded} duration={0.3}>
          <Slider
            onChange={handleChange}
            onSlideStart={onSlideStart}
            onSlideEnd={onSlideEnd}
            fillColor={fillColor}
            x={(isExpanded && (userValue || 0.0)) || (!isExpanded && value)}
            disabled={readonly}
            selectedTag={selectedTag}
            inProgress={inProgress}
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
