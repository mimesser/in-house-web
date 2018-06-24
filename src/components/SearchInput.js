import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'components';
import baseComponent from './base-component';

const BaseComponent = baseComponent('div');

const Container = BaseComponent.extend`
   position: relative;
   display: flex;
   align-items: center;
   width: ${props => props.width};
   i {
      right: 7px;
      position: absolute;
      font-size: 31px;
      cursor: pointer;
   }
`;

export default class SearchInput extends Component {
   constructor(props) {
      super(props);
      this.state = {
         value: props.value,
      };
   }

   render() {
      const {
         onChange, value, placeholder, ...props
      } = this.props;

      const inputProps = { placeholder };

      if (onChange) {
         inputProps.onChange = (event) => {
            onChange(event.target.value);
         };
         inputProps.value = props.value;
      } else {
         inputProps.onChange = (event) => {
            this.setState({ value: event.target.value });
         };
         inputProps.value = this.state.value;
      }

      return (
         <Container {...props}>
            <input {...inputProps} ref={(el) => { this.el = el; }} />
            <Icon onClick={() => this.el.focus()}>search</Icon>
         </Container>
      );
   }
}

SearchInput.propTypes = {
   onChange: PropTypes.func,
   width: PropTypes.string,
   value: PropTypes.oneOfType([
      PropTypes.string, PropTypes.number,
   ]),
   placeholder: PropTypes.string,
};

SearchInput.defaultProps = {
   width: 'auto',
   value: '',
};
