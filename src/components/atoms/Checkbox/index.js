import React from 'react';
import styled from 'styled-components';

import { Icon } from '../Icon';
import { spacing } from '../../../style';

const CheckboxContainer = styled.div`
  display: inline-flex;
  align-items: flex-start;
  cursor: pointer;

  ${Icon} {
    flex-shrink: 0;
    svg {
      fill: none;
    }
  }
  > span:last-of-type {
    margin-left: ${spacing.md};
  }
`;

// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs(() => ({ type: 'checkbox' }))`
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

export const Checkbox = ({ className, checked, children, ...props }) => (
  <label className={className}>
    <CheckboxContainer>
      <HiddenCheckbox checked={checked} {...props} />
      <Icon icon={checked ? 'checkbox-marked' : 'checkbox'} size={1.5} />
      <span>{children}</span>
    </CheckboxContainer>
  </label>
);
