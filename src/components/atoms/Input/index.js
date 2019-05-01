import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { font, ifProp, palette } from '../../../utils';

const fontSize = ({ height }) => `${height / 35.5555555556}rem`;

const styles = css`
   font-family: ${font('primary')};
   display: block;
   width: 100%;
   margin: 0;
   box-sizing: border-box;
   font-size: ${fontSize};
   padding: ${ifProp({ type: 'textarea' }, `${0.4444444444}em`, 'unset')};
   height: ${ifProp({ type: 'textarea' }, 'auto', 'unset')};
   color: currentcolor;
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
      border: 1px solid #1a90e4;
   }
   ::placeholder {
      color: #a3a3a3;
   }
`;

const StyledTextarea = styled.textarea`
   ${styles}
`;

const StyledSelect = styled.select`
   ${styles}
`;

const StyledInput = styled.input`
   ${styles}
`;

export const Input = ({ ...props }) => {
   const { type } = props;

   if (type === 'textarea') {
      return <StyledTextarea {...props} />;
   }

   if (type === 'select') {
      return <StyledSelect {...props} />;
   }

   return <StyledInput {...props} />;
};

Input.propTypes = {
   type: PropTypes.string,
   reverse: PropTypes.bool,
   height: PropTypes.number,
   invalid: PropTypes.bool,
};

Input.defaultProps = {
   type: 'text',
   height: 40,
   reverse: false,
   invalid: false,
};
