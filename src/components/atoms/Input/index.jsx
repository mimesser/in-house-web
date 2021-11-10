import React from 'react';
import styled, { css } from 'styled-components';

import { spacing, font, fontSize, palette } from '../../../style';

const strikeThrough = ({ strike }) =>
  strike &&
  css`
    text-decoration: line-through;
  `;

const borderWidth = ({ error }) => (error ? 3 : 1);
const borderColor = ({ error }) => (error ? palette.primary : palette.gray);

export const placeholder = css`
  color: ${palette.gray};
`;

export const fontStyle = css`
  font-size: ${fontSize.md};
  ${font.primary};
`;

export const baseFormControlStyle = css`
  margin: 0;
  box-sizing: border-box;
  ${fontStyle};
  border: ${borderWidth}px solid ${borderColor};
  color: ${palette.primary};
  transition: color 0.3s, border-color 0.3s;
  ${strikeThrough};
  ::placeholder {
    ${placeholder};
  }
  :hover:not(:disabled),
  :active:not(:disabled),
  :focus:not(:disabled) {
    color: ${palette.primary};
    border-color: ${palette.primary};
    outline: none;
  }
  :disabled {
    color: ${palette.lightGray};
    border-color: ${palette.lightGray};
  }
`;

export const baseInputStyle = css`
  display: block;
  width: 100%;
  padding: ${spacing.sm} ${spacing.md};
  ${baseFormControlStyle};
`;

export const Textarea = styled.textarea`
  ${baseInputStyle};
  resize: none;
`;

export const Input = styled.input`
  ${baseInputStyle}
`;
