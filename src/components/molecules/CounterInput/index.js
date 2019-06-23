import React, { useCallback } from 'react';

import { CharLimit, Status, Error } from './style';
import { Textarea, Input, FormGroup } from '../../atoms';

export const CounterInput = ({ value, onChange, max, multiline, label, error, ...inputProps }) => {
   const handleChange = useCallback(
      e => {
         const { value } = e.currentTarget;
         onChange(value.substring(0, max));
      },
      [onChange],
   );
   const Control = multiline ? Textarea : Input;

   return (
      <FormGroup>
         <label>
            {label}
            <Control {...inputProps} onChange={handleChange} value={value} />
         </label>
         <Status>
            {error && <Error>{error}</Error>}
            <CharLimit reached={value.length === max}>{max}</CharLimit>
         </Status>
      </FormGroup>
   );
};
