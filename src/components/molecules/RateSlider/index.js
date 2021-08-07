import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import isNumber from 'lodash/isNumber';

import { CircleSlider, NumberLarge, NumberSmall, Icon, Slider, SlidingValue } from '../../atoms';
import { fontSize, font, palette, theme } from '../../../style';
import { getClientPosition } from '../../atoms/Slider/utils';
import { RateCategory } from '../RateCategory';

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
  top: 2em;
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

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                supported by Chrome, Edge, Opera and Firefox */
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
  top: 5px;

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
  rateInProgress,
  targetRate,
  ...sliderProps
}) => {
  const { readonly: decimal, size, padd, fillColor = palette.darkGray } = sliderProps;
  const [value, setValue] = useState(initialValue);
  const [userValue, setUserValue] = useState(userRate);
  const selectedRef = useRef();
  const currentValue = `${Math.floor((expanded ? userValue / 10 : value) * 10)}`;
  const changeRate = (e) => {
    const rect = selectedRef.current.getBoundingClientRect();
    const clientPos = getClientPosition(e);
    if (clientPos.x < 0 || clientPos.x > rect.width) return;
    const rate = ((clientPos.x / rect.width) * 10).toFixed(1);

    setUserValue(rate);
    onChange(rate);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    setUserValue(targetRate);
  }, [targetRate]);

  return (
    <>
      <Wrapper
        ref={selectedRef}
        // onMouseDown={!rateInProgress ? (e) => changeRate(e) : undefined}
        onMouseMove={expanded && !inProgress ? (e) => changeRate(e) : undefined}
        onMouseUp={expanded && !inProgress ? (e) => changeRate(e) : undefined}
        onClick={expanded && !inProgress ? () => onSlideEnd(userValue) : undefined}
        // onTouchStart={!rateInProgress ? (e) => changeRate(e) : undefined}
        onTouchMove={expanded && !inProgress ? (e) => changeRate(e) : undefined}
        onTouchEnd={expanded && !inProgress ? () => onSlideEnd(userValue) : undefined}
      >
        <Title>{title}</Title>
        <Votes count={voteCount} userRate={userRate} expanded={expanded} />
        <SlidingWrapper expanded={expanded}>
          {(expanded || (userValue && value)) && (
            <SlidingValue
              fontSize={expanded ? fontSize.lg : fontSize.md}
              value={currentValue}
              minLength={expanded ? 1 : 2}
            >
              {!expanded && <Dot size={expanded ? 140 : 80} padd={padd} color={valueColor} />}
            </SlidingValue>
          )}
        </SlidingWrapper>
        {/* {isExpanded && <TouchHelper />} */}
        <SliderWrapper expanded={expanded} duration={0.15}>
          <Slider
            // onChange={handleChange}
            // onSlideStart={onSlideStart}
            // onSlideEnd={onSlideEnd}
            fillColor={fillColor}
            x={(expanded && (userValue || 0.0)) || (!expanded && value)}
            // disabled={readonly}
            selectedTag={selectedTag}
            // inProgress={inProgress}
          >
            {userValue && !expanded && <Indicator percentage={userValue * 10} />}
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
