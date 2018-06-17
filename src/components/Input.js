import React from 'react';
import PropTypes from 'prop-types';
import baseComponent from './base-component';

export default function Input({ width, ...props }) {
   const BaseComponent = baseComponent('input');

   const Wrapper = BaseComponent.extend`
      padding: 6px;
      width: ${width};
   `;

   return <Wrapper {...props} />;
}

Input.propTypes = {
   width: PropTypes.string,
};

Input.defaultProps = {
   width: 'auto',
};
