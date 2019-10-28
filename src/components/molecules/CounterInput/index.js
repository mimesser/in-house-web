import React, { useCallback } from 'react';

import { CharLimit, Status, Error } from './style';
import { Textarea, Input, FormGroup } from '../../atoms';

export const CounterInput = ({ value, onChange, max, multiline, label, marginless, error, ...inputProps }) => {
  const handleChange = useCallback(
    e => {
      const { value } = e.currentTarget;
      onChange(value.substring(0, max));
    },
    [onChange],
  );

  const Control = multiline ? Textarea : Input;
  const characters = value.length;

  return (
    <FormGroup marginless={marginless}>
      <label>
        {label}
        <Control {...inputProps} onChange={handleChange} value={value} error={error} />
      </label>
      <Status>
        {error && <Error>{error}</Error>}
        <CharLimit>{`${characters}/${max}`}</CharLimit>
      </Status>
    </FormGroup>
  );
};
