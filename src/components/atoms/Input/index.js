import React from 'react';
import styled, { css } from 'styled-components';

import { spacing, fontWeight, font, palette } from '../../../style';

const strikeThrough = ({ strike }) =>
  strike &&
  css`
    text-decoration: line-through;
  `;

const borderWidth = ({ error }) => (error ? 3 : 1);
const borderColor = ({ error }) => (error ? palette.primary : palette.lightGray);

export const placeholder = css`
  color: ${palette.gray};
`;

export const fontStyle = css`
  font-size: 1rem;
  font-family: ${font.primary};
  font-weight: ${fontWeight.normal};
`;

export const baseFormControlStyle = css`
  margin: 0;
  box-sizing: border-box;
  ${fontStyle};
  border: ${borderWidth}px solid ${borderColor};
  color: ${palette.black};
  transition: color 0.3s, border-color 0.3s;
  ${strikeThrough};
  ::placeholder {
    ${placeholder};
  }
  :hover:not(:disabled),
  :active:not(:disabled),
  :focus:not(:disabled) {
    color: ${palette.black};
    border-color: ${palette.black};
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
  padding: ${spacing.md};
  ${baseFormControlStyle};
`;

export const Textarea = styled.textarea`
  ${baseInputStyle};
  resize: none;
`;

export const Input = styled.input`
  ${baseInputStyle}
`;
