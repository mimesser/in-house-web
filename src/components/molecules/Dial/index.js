import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import isNumber from 'lodash/isNumber';
import { Users } from 'styled-icons/feather';

import { CircleSlider, Number } from '../../atoms';
import { fontSize, palette } from '../../../style';

const FONT_RATIO = 4.5;

const SuperScriptDecimalSpan = styled.span`
   vertical-align: super;
   font-size: 0.5em;
   margin-left: -2px;
`;

const Value = styled(Number)`
   font-size: ${({ size, padd }) => (size - padd) / FONT_RATIO}px;
`;

export const Votes = styled(({ count, iconSize = 20, ...rest }) => (
   <Number {...rest}>
      <Users size={iconSize} /> <span>{count || 0}</span>
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

const BaseSlider = ({ value: initialValue, voteCount, ...sliderProps }) => {
   const { readonly: decimal, size, padd } = sliderProps;
   const [value, setValue] = useState(initialValue);
   useEffect(() => {
      setValue(initialValue);
   }, [initialValue]);

   return (
      <CircleSlider {...sliderProps} onChanging={setValue} initialValue={initialValue}>
         <Value size={size} padd={padd}>
            {renderValue(value, decimal)}
            {voteCount && <Votes count={voteCount} />}
         </Value>
      </CircleSlider>
   );
};

BaseSlider.defaultProps = {
   size: 300,
};

export const Dial = styled(BaseSlider)``;
