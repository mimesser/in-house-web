import React from 'react';
import styled from 'styled-components';

import { calcRem, palette, fontSize } from '../../../style';

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const Icon = styled.svg.attrs({
  viewBox: '0 0 24 24',
  children: <polyline points="20 6 9 17 4 12" />,
})`
  fill: none;
  stroke: ${palette.text};
  stroke-width: 2px;
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

const Container = styled.div`
  display: inline-block;
  width: ${fontSize.large};
  height: ${fontSize.large};
  border: 1px solid ${palette.secondary};
  border-radius: ${calcRem('3px')};
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 2px ${palette.secondaryLight};
  }

  ${Icon} {
    visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
  }
`;

export const Checkbox = ({ className, checked, ...props }) => (
  <label className={className}>
    <CheckboxContainer>
      <HiddenCheckbox checked={checked} {...props} />
      <Container checked={checked}>
        <Icon />
      </Container>
    </CheckboxContainer>
  </label>
);
