import React from 'react';
import styled, { css } from 'styled-components';

import { Loader } from '../Loader';
import { withForwardedRef } from '../../withForwardedRef';
import { font, palette, fontSize, spacing } from '../../../style';
import { Icon } from '../Icon';

const background = ({ outline, dashed, disabled, darkMode }) => {
  if (disabled) {
    return darkMode ? palette.darkGray : palette.lightGray;
  }
  if (outline || dashed) {
    return palette.white;
  }

  return darkMode ? palette.white : palette.primary;
};

const border = ({ outline, dashed, disabled, darkMode }) => {
  if (disabled) {
    return darkMode ? palette.darkGray : palette.lightGray;
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

const color = ({ outline, dashed, disabled, darkMode }) => {
  if (disabled) {
    return darkMode ? palette.gray : palette.offWhite;
  }
  if (dashed) {
    return palette.primary;
  }
  if (outline) {
    return palette.black;
  }
  return darkMode ? palette.primary : palette.white;
};

const cursor = ({ disabled }) => (disabled ? 'not-allowed' : 'pointer');

const width = ({ wide }) => wide && `width: 100%`;

const resetButtonStyles = css`
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
  text-decoration: none;
  text-align: center;
  padding: 0;
  color: currentColor;
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
  ${font.bold};
  > ${Icon} {
    margin-left: ${({ wide }) => (wide ? 'auto' : spacing.xxl)};
  }
`;

export const Button = styled(
  withForwardedRef(({ icon, loading, children, forwardedRef, darkMode, ...props }) => (
    <BaseButton as={props.href && 'a'} {...props} ref={forwardedRef} darkMode={darkMode}>
      {loading ? <Loader small white /> : children}
      {icon && <Icon icon={icon} />}
    </BaseButton>
  )),
)``;

// TODO: active/focus etc
export const ClearButton = styled.button`
  ${resetButtonStyles};
  display: inline-flex;
  align-items: center;
`;

export const TransparentLinkStyle = css`
  background: none;
  font-size: ${fontSize.sm};
  padding-left: 0;
`;
