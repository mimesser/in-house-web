import React from 'react';
import styled, { css } from 'styled-components';

import { font, ifProp, palette } from '../../../utils';
import { spacing, fontWeight } from '../../../theme';

const styles = css`
   font-family: ${font('primary')};
   display: block;
   width: 100%;
   margin: 0;
   box-sizing: border-box;
   font-size: 1rem;
   font-weight: ${fontWeight.primary};
   padding: ${spacing.input};
   color: ${({ theme: { textColors } }) => textColors.primary};
   box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.08);
   border: 1px solid ${ifProp('invalid', palette('danger', 2), 'transparent')};
   border-radius: 3px;
   &[type='checkbox'],
   &[type='radio'] {
      display: inline-block;
      border: 0;
      border-radius: 0;
      width: auto;
      height: auto;
      margin: 0 0.2rem 0 0;
   }
   :active,
   :focus {
      border: 1px solid ${ifProp('invalid', palette('danger', 2), '#1a90e4')};
      outline: none;
   }
   ::placeholder {
      color: ${({ theme: { palette } }) => palette.grayscale[1]};
   }
`;

export const Textarea = styled.textarea`
   ${styles};
   resize: none;
`;

export const Select = styled.select`
   ${styles}
`;

export const Input = styled.input`
   ${styles}
`;

export const Checkbox = styled.input.attrs({
   type: 'checkbox',
})`
   ${styles}
`;
