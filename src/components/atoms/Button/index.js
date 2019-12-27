import React from 'react';
import styled, { css } from 'styled-components';

import { Loader } from '../Loader';
import { withForwardedRef } from '../../withForwardedRef';
import { fontWeight, palette, fontSize, spacing } from '../../../style';
import { Icon } from '../Icon';

const background = ({ outline, dashed, disabled }) => {
  if (disabled) {
    return palette.lightGray;
  }
  if (outline || dashed) {
    return palette.white;
  }

  return palette.primary;
};

const border = ({ outline, dashed, disabled }) => {
  if (disabled) {
    return palette.lightGray;
  }
  if (outline) {
    return palette.black;
  }
  if (dashed) {
    return palette.primary;
  }
  return palette.transparent;
};

const borderStyle = ({ dashed }) => (dashed ? 'dashed' : 'solid');

const color = ({ outline, dashed, disabled }) => {
  if (disabled) {
    return palette.offWhite;
  }
  if (dashed) {
    return palette.primary;
  }
  if (outline) {
    return palette.black;
  }
  return palette.white;
};

const cursor = ({ disabled }) => (disabled ? 'not-allowed' : 'pointer');

const width = ({ wide }) => wide && `width: 100%`;

// TODO: export ClearButton?
export const resetButtonStyles = css`
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
  text-decoration: none;
  text-align: center;
  padding: 0;
`;

const BaseButton = styled.button`
  ${resetButtonStyles};
  display: inline-flex;
  align-items: center;
  ${width};
  cursor: ${cursor};
  border: 1px ${borderStyle} ${border};
  background-color: ${background};
  color: ${color};
  padding: ${spacing.md} ${spacing.xl};
  font-size: ${fontSize.md};
  font-weight: ${fontWeight.bold};
  > ${Icon} {
    margin-left: ${({ wide }) => (wide ? 'auto' : spacing.xxl)};
  }
`;

export const Button = styled(
  withForwardedRef(({ loading, children, forwardedRef, tag, ...props }) => (
    <BaseButton {...props} as={tag} ref={forwardedRef}>
      {loading ? <Loader small white /> : children}
    </BaseButton>
  )),
)``;

// TODO: active/focus etc
export const IconButton = styled.button`
  ${resetButtonStyles};
  padding: 0;
  color: currentColor;
  background: transparent;
`;
