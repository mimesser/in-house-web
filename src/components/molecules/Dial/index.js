import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import isNumber from 'lodash/isNumber';

import { CircleSlider, Number, Icon } from '../../atoms';
import { fontSize, palette } from '../../../style';

const FONT_RATIO = 3.5;

const SuperScriptDecimalSpan = styled.span`
  vertical-align: super;
  font-size: 0.5em;
  margin-left: -2px;
`;

const Value = styled(Number)`
  color: ${({ color }) => color};
  font-size: ${({ size, padd }) => (size - padd) / FONT_RATIO}px;
`;

export const Votes = styled(({ count, iconSize = 1, ...rest }) => (
  <Number {...rest}>
    <Icon icon="users" size={iconSize} /> <span>{count || 0}</span>
  </Number>
))`
  font-size: ${fontSize.primary};
  display: flex;
  justify-content: center;
  color: ${palette.secondaryLight};
  svg {
    padding: 0 3px 0 0;
  }
`;

const renderValue = (value, decimal) => {
  if (!isNumber(value)) {
    return null;
  }

  if (decimal) {
    const parts = value.toFixed(1).split('.');
    return (
      <>
        <span>{parts[0]}.</span>
        <SuperScriptDecimalSpan>{parts[1]}</SuperScriptDecimalSpan>
      </>
    );
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
        {voteCount && <Votes count={voteCount} />}
      </Value>
    </CircleSlider>
  );
};

BaseSlider.defaultProps = {
  size: 300,
  padd: 0,
};

export const Dial = styled(BaseSlider)``;
