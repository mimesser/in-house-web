import React from 'react';
import PropTypes from 'prop-types';
import baseComponent from './base-component';

const BaseComponent = baseComponent('input');

const Wrapper = BaseComponent.extend`
   padding: 6px;
   width: ${props => props.width};
`;

export default function Input({ onChange, ...props }) {
   function changeHandler({ target: { value } }) {
      onChange(value);
   }

   return <Wrapper {...props} onChange={changeHandler} />;
}

Input.propTypes = {
   onChange: PropTypes.func.isRequired,
   width: PropTypes.string,
};

Input.defaultProps = {
   width: 'auto',
};
