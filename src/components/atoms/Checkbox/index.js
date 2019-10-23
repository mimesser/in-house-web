import React from 'react';
import styled from 'styled-components';

import { Icon } from '../Icon';

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const Checkbox = ({ className, checked, ...props }) => (
  <label className={className}>
    <CheckboxContainer>
      <HiddenCheckbox checked={checked} {...props} />
      <Icon icon={checked ? 'checkbox-marked' : 'checkbox'} size={1.5} />
    </CheckboxContainer>
  </label>
);
