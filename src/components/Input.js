import React, { Component } from 'react';
import PropTypes from 'prop-types';
import baseComponent from './base-component';

const BaseComponent = baseComponent('input');

const Wrapper = BaseComponent.extend`
   width: ${props => props.width};
`;

export default class Input extends Component {
   constructor(props) {
      super(props);
      this.state = {
         value: props.value,
      };
   }

   render() {
      const { onChange, ...rest } = this.props;

      const props = { ...rest };
      if (onChange) {
         props.onChange = (event) => {
            onChange(event.target.value);
         };
         props.value = rest.value;
      } else {
         props.onChange = (event) => {
            this.setState({ value: event.target.value });
         };
         props.value = this.state.value;
      }

      return <Wrapper {...props} />;
   }
}

Input.propTypes = {
   onChange: PropTypes.func,
   width: PropTypes.string,
   value: PropTypes.oneOfType([
      PropTypes.string, PropTypes.number,
   ]),
};

Input.defaultProps = {
   width: 'auto',
   value: '',
};
