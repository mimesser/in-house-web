import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import isNumber from 'lodash/isNumber';

import { CircleSlider, NumberLarge, NumberSmall, Icon } from '../../atoms';
import { fontSize, font, palette } from '../../../style';
import { pluralFormatRatings } from '../../../utils/format';

const FONT_RATIO = 3.6;

const SuperScriptDecimalSpan = styled.span`
  vertical-align: super;
  font-size: 0.5em;
  margin-left: -2px;
`;

const Value = styled(NumberLarge)`
  color: ${({ color }) => color};
  font-size: ${({ size, padd }) => (size - padd) / FONT_RATIO}px;
  ${font.bold};
`;

export const Votes = styled(({ count, iconSize = 1, ...rest }) => (
  <NumberSmall {...rest}>
    <Icon icon="users" size={iconSize} /> <span>{count || 0}</span>
  </NumberSmall>
))`
  font-size: ${fontSize.sm};
  display: flex;
  justify-content: center;
  color: ${palette.gray};
  svg {
    padding: 0 3px 0 0;
  }
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

const BaseSlider = ({ value: initialValue, voteCount, valueColor, ...sliderProps }) => {
  const { readonly: decimal, size, padd } = sliderProps;
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <CircleSlider {...sliderProps} onChanging={setValue} initialValue={initialValue}>
      <Value size={size} padd={padd} color={valueColor}>
        {renderValue(value, decimal)}
        {voteCount && <Votes pluralFormal={pluralFormatRatings} count={voteCount} />}
      </Value>
    </CircleSlider>
  );
};

BaseSlider.defaultProps = {
  size: 300,
  padd: 0,
};

export const Dial = styled(BaseSlider)``;
