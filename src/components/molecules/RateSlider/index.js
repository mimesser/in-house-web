import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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
  margin-left: 24px;

  margin-top: 1.7em;
  color: ${({ color }) => color};
  ${font.bold};
  font-size: ${fontSize.md};
`;

const Wrapper = styled.div`
  background-color: #f9f9f9;
  width: 376px;
  height: 97px;
  border-bottom: 1px solid #e0e0e0;
`;

export const Votes = styled(({ count, iconSize = 1, ...rest }) => (
  <NumberSmall {...rest}>
    <Icon icon="users" size={iconSize} /> <span className="count">{count || 0}</span>{' '}
    <span className="divide">{'   /'}</span>
  </NumberSmall>
))`
  position: relative;
  font-size: ${fontSize.sm};
  display: flex;
  color: ${theme.colors.mediumGray};
  width: 150px;
  margin-top: -2em;
  left: 250px;
  top: 10px;
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
  margin-top: -2em;
  margin-left: auto;
`;

const SliderWrapper = styled.div`
  position: relative;
  width: 322px;
  height: 8px;
  top: 65px;
  margin-left: 24px;

  ${Slider} {
    height: 100%;
    margin: 0;
  }
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
  voteCount = 213,
  valueColor,
  title = 'rate & appreciation',
  userRate = null,
  readonly,
  expanded,
  ...sliderProps
}) => {
  const { readonly: decimal, size, padd } = sliderProps;
  const [value, setValue] = useState(initialValue);
  const [isExpanded, setExpanded] = useState(expanded);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Wrapper onClick={() => setExpanded(!isExpanded)}>
      <SliderWrapper>
        <Slider onChange={setValue} x={initialValue} disabled={readonly || !isExpanded}>
          {userRate && <Indicator percentage={userRate * 10} />}
        </Slider>
      </SliderWrapper>

      <Title>{title}</Title>
      <Votes count={voteCount} />
      {value && (
        <SlidingWrapper>
          <SlidingValue fontSize={fontSize.lg} value={`${Math.floor(value * 10)}`}>
            <Dot size={140} padd={padd} color={valueColor} />
          </SlidingValue>
        </SlidingWrapper>
      )}
    </Wrapper>
  );
};

BaseRateSlider.defaultProps = {
  size: 300,
  padd: 0,
};

export const RateSlider = styled(BaseRateSlider)``;
