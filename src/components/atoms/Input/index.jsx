import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { appColors, calcRem } from '../../../style';

const strikeThrough = ({ strike }) =>
  strike &&
  css`
    text-decoration: line-through;
  `;

const borderWidth = ({ error }) => (error ? 3 : 1);
const borderColor = ({ error, variant }) => {
  if (variant === 'light') {
    return error ? appColors.gray100 : appColors.gray400;
  }
  return error ? appColors.gray600 : appColors.gray400;
};

export const placeholder = css`
  color: ${appColors.gray400};
  font-size: ${calcRem(14)};
`;

export const baseFormControlStyle = css`
  margin: 0;
  box-sizing: border-box;
  font-size: ${calcRem(14)};
  font-family: 'Helvetica', sans-serif;
  background: ${({ variant }) => (variant === 'light' ? 'none' : 'white')};
  border: ${borderWidth}px solid ${borderColor};
  color: ${({ variant }) => (variant === 'light' ? appColors.gray300 : appColors.gray500)};
  transition: color 0.3s, border-color 0.3s;
  ${strikeThrough};
  ::placeholder {
    ${placeholder};
  }
  :hover:not(:disabled),
  :active:not(:disabled),
  :focus:not(:disabled) {
    color: ${({ variant }) => (variant === 'light' ? appColors.gray300 : appColors.gray500)};
    border-color: ${({ variant }) => (variant === 'light' ? appColors.gray300 : appColors.gray500)};
    outline: none;
  }

  :disabled {
    color: ${appColors.gray200};
    border-color: ${appColors.gray200};
  }
`;

export const baseInputStyle = css`
  display: block;
  width: 100%;
  padding: ${calcRem(11)} ${calcRem(8)};
  ${baseFormControlStyle};
`;

export const Textarea = styled.textarea`
  ${baseInputStyle};
  resize: none;
`;

export const Input = styled.input`
  ${baseInputStyle}
`;

Input.propTypes = {
  variant: PropTypes.oneOf(['light', 'dark']),
};

Textarea.propTypes = {
  variant: PropTypes.oneOf(['light', 'dark']),
};
