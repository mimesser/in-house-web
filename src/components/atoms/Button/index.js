import React from 'react';
import styled from 'styled-components';

import { Loader } from '../Loader';
import { withForwardedRef } from '../../withForwardedRef';
import { fontWeight, palette, fontSize, letterSpacing, spacing, calcRem } from '../../../style';

const background = ({ secondary, disabled }) => {
  if (secondary) {
    return palette.white;
  }

  return disabled ? palette.secondary : palette.primaryLight;
};

const border = ({ secondary, disabled }) => {
  if (secondary) {
    return disabled ? palette.secondaryLight : palette.secondaryDark;
  }

  return disabled ? palette.secondary : palette.primaryLight;
};

const color = ({ secondary, disabled }) => {
  if (secondary) {
    return disabled ? palette.secondaryLight : palette.textDark;
  }
  return palette.white;
};

const BaseButton = styled.button`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  border-radius: 2em;
  border: 1px solid ${border};
  background-color: ${background};
  color: ${color};
  padding: ${fontSize.small} ${calcRem('60px')};
  font-size: ${fontSize.small};
  font-weight: ${fontWeight.primary};
  letter-spacing: ${letterSpacing.primary};
  outline: none;
  text-decoration: none;
  text-align: center;
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
  padding: 0;
  border: none;
  outline: none;
  cursor: pointer;
  color: currentColor;
  background: transparent;
`;
