import React from 'react';
import styled, { css } from 'styled-components';

import { spacing, fontWeight, font, palette } from '../../../style';

const strikeThrough = ({ strike }) =>
  strike &&
  css`
    text-decoration: line-through;
  `;

const borderWidth = ({ error }) => (error ? 3 : 1);
const borderColor = ({ error }) => (error ? palette.primary : palette.secondary);

export const placeholder = css`
  color: ${palette.textUltraLight};
`;

export const fontStyle = css`
  font-size: 1rem;
  font-family: ${font.primary};
  font-weight: ${fontWeight.primary};
`;

export const baseFormControlStyle = css`
  margin: 0;
  box-sizing: border-box;
  ${fontStyle};
  border: ${borderWidth}px solid ${borderColor};
  color: ${palette.textLight};
  transition: color 0.3s, border-color 0.3s;
  ${strikeThrough};
  ::placeholder {
    ${placeholder};
  }
  :hover:not(:disabled),
  :active:not(:disabled),
  :focus:not(:disabled) {
    color: ${palette.textDark};
    border-color: ${palette.primaryLight};
    outline: none;
  }
  :disabled {
    color: ${palette.secondaryLight};
    border-color: ${palette.secondaryLight};
  }
`;

export const baseInputStyle = css`
  display: block;
  width: 100%;
  padding: ${spacing.medium};
  ${baseFormControlStyle};
`;

export const Textarea = styled.textarea`
  ${baseInputStyle};
  resize: none;
`;

export const Input = styled.input`
  ${baseInputStyle}
`;
