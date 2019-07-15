import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import isNumber from 'lodash/isNumber';

import { CircleSlider, Number } from '../../atoms';

const FONT_RATIO = 4.5;

const SuperScriptDecimalSpan = styled.span`
   vertical-align: super;
   font-size: 0.5em;
   margin-left: -2px;
`;

const Value = styled(Number)`
   font-size: ${({ size, padd }) => (size - padd) / FONT_RATIO}px;
`;

const renderValue = (value, decimal) => {
   if (!isNumber(value)) {
      return null;
   }

   if (decimal) {
      const parts = String(value).split('.');
      return (
         <>
            <span>{parts[0]}.</span>
            <SuperScriptDecimalSpan>{parts[1] || 0}</SuperScriptDecimalSpan>
         </>
      );
   }

   return value;
};

const BaseSlider = ({ value: initialValue, ...sliderProps }) => {
   const { readonly: decimal, size, padd } = sliderProps;
   const [value, setValue] = useState(initialValue);
   useEffect(() => {
      setValue(initialValue);
   }, [initialValue]);

   return (
      <CircleSlider {...sliderProps} onChanging={setValue} initialValue={initialValue}>
         <Value size={size} padd={padd}>
            {renderValue(value, decimal)}
         </Value>
      </CircleSlider>
   );
};

BaseSlider.defaultProps = {
   size: 300,
};

export const Dial = styled(BaseSlider)``;
