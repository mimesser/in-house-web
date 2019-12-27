import React, { useRef, useCallback } from 'react';
import styled from 'styled-components';

import { Button } from '../../atoms';

const HiddenInput = styled.input.attrs(() => ({ type: 'file' }))`
  display: none;
`;

export const FilePicker = ({ children, onChange, accept, onClick, ...btnProps }) => {
  const inputRef = useRef(null);
  const handleClick = useCallback(() => inputRef.current.click(), [inputRef]);
  const handleChange = useCallback(
    e => {
      const file = e.target.files && e.target.files[0];
      onChange(file);
    },
    [onChange],
  );

  return (
    <>
      <HiddenInput ref={inputRef} onChange={handleChange} accept={accept} />
      <Button {...btnProps} onClick={handleClick}>
        {children}
      </Button>
    </>
  );
};
