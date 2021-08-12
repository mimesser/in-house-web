import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import isNumber from 'lodash/isNumber';
import debounce from 'lodash.debounce';

import { NumberLarge, NumberSmall, Icon, Slider, SlidingValue } from '../../atoms';
import { fontSize, font, palette, theme } from '../../../style';
import { getClientPosition } from '../../atoms/Slider/utils';

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

const SlidingValueWrapper = styled.div`
  width: 70px;
  height: 54px;
  pointer-events: none;
  margin-top: ${({ expanded }) => (expanded === true ? '-16px' : '4px')};
  margin-left: auto;
  z-index: 11;
  padding-top: 4px;
  flex-direction: row;
  align-content: center;
  justify-content: space-around;
  align-items: baseline;
   ${({ expanded }) => (expanded === true ? 'display: flex; margin-right:50px;' : '')}

}
`;

const SlidingWrapper = styled.div`
  width: 70px;
  height: 54px;
  pointer-events: none;
  margin-top: ${({ expanded }) => (expanded === true ? '-16px' : '4px')};
  margin-left: auto;
  z-index: 11;
  padding-top: 4px;

}
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
  initialRating,
  voteCount,
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
  const [hiddenValue, setHiddenValue] = useState(initialRating);
  const [totalVoteCount, setVoteCount] = useState(voteCount);
  const [userValue, setUserValue] = useState(userRate);
  const [tempRate, setTempRate] = useState(null);
  const [tempClientPos, setTempClientPos] = useState(0);
  const [preAverage, setPreAverage] = useState(null);
  const selectedRef = useRef();
  const currentValue = `${Math.floor((expanded ? userValue / 10 : value) * 10)}`;
  const changeRate = (e) => {
    const clientPos = getClientPosition(e);

    if (clientPos.x - tempClientPos > 10 || clientPos.x - tempClientPos < -10) {
      console.log(clientPos.x - tempClientPos > 10);
      console.log(clientPos.x - tempClientPos);
      console.log(clientPos.x - tempClientPos);
      console.log(clientPos.x - tempClientPos < -10);
      setTempClientPos(clientPos.x);
      const rect = selectedRef.current.getBoundingClientRect();
      if (clientPos.x < 0 || clientPos.x > rect.width) return;
      const rate = ((clientPos.x / rect.width) * 10).toFixed(1);

      const rateAsNumber = Number(rate).toFixed(1);

      if (rateAsNumber !== tempRate) {
        if (rateAsNumber % 1 === 0) {
          const newAverage = calculateMeanRating(totalVoteCount, Number(hiddenValue) || 5, Number(rate), userRate);
          setPreAverage(newAverage);
          onChange(rate);
          console.log(rate);
        }
        setTempRate(rateAsNumber);
        setUserValue(rate);
      }
    }
  };

  function calculateMeanRating(nValues, average, newValue, oldValue) {
    let trueAverage = average;
    if (oldValue !== null) {
      let valueA = average * nValues;
      valueA -= oldValue;
      const valueB = nValues - 1;
      trueAverage = valueA / valueB;
    }
    const valueA = newValue - trueAverage;
    const valueB = nValues + 1;
    const valueC = valueA / valueB;
    const newAverage = trueAverage + valueC;
    return newAverage;
  }

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
        onMouseMove={expanded && !inProgress ? (e) => changeRate(e) : undefined}
        onClick={expanded && !inProgress ? () => onSlideEnd(userValue) : undefined}
        onTouchMove={expanded && !inProgress ? (e) => changeRate(e) : undefined}
        onTouchEnd={expanded && !inProgress ? () => onSlideEnd(userValue) : undefined}
      >
        <Title>{title}</Title>
        <Votes count={voteCount} userRate={userRate} expanded={expanded} />

        <SlidingValueWrapper expanded={expanded}>
          {(expanded || (userValue && value)) && (
            <>
              <SlidingValue
                fontSize={expanded ? fontSize.lg : fontSize.md}
                value={
                  // eslint-disable-next-line no-nested-ternary
                  expanded && tempRate
                    ? `${Math.floor(Number(tempRate).toFixed(0))}`
                    : preAverage
                    ? `${Math.floor(preAverage.toFixed()) * 10}`
                    : currentValue
                }
                minLength={expanded ? 1 : 2}
              >
                {!expanded && <Dot size={expanded ? 140 : 80} padd={padd} color={valueColor} />}
              </SlidingValue>
              {expanded ? (
                <>
                  <h1>/</h1>

                  <SlidingValue
                    fontSize={expanded ? fontSize.lg : fontSize.md}
                    value={preAverage > 0.5 ? `${preAverage.toFixed(1) * 10}` : currentValue}
                    minLength={2}
                  >
                    <Dot size={expanded ? 140 : 80} padd={padd} color={valueColor} />
                  </SlidingValue>
                </>
              ) : null}
            </>
          )}
        </SlidingValueWrapper>
        <SliderWrapper expanded={expanded} duration={0.0015}>
          <Slider
            fillColor={fillColor}
            x={(expanded && (userValue || 0.0)) || (!expanded && value)}
            selectedTag={selectedTag}
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
