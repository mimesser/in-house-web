/* global document */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'components';
import styled from 'styled-components';
import baseComponent from './base-component';

const BaseComponent = baseComponent('div');

const Container = BaseComponent.extend`
   position: relative;
   display: flex;
   align-items: center;
   i {
      position: absolute;
      right: 3px;
      cursor: pointer;
   }
   button {
      color: inherit;
   }
`;

const Dropdown = styled.ol`
   position: absolute;
   top: 100%;
   border: inherit;
   right: -1px;
   left: -1px;
   background-color: inherit;
   z-index: 10;
   li button {
      padding: 8px;
   }
`;

const DropdownButton = styled.button`
   width: 100%;
   text-align: left;
`;

const Input = styled.input`
   color: inherit;
   padding: 4px;
   width: 100%;
`;

export default class Select extends Component {
   constructor(props) {
      super(props);
      this.state = {
         search: '',
         open: false,
      };
   }

   componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside);
   }

   componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
   }

   onFocus = () => {
      this.setState({ open: true });
   }

   setValue = (id) => {
      const value = this.props.options.find(o => o.id === id);
      this.setState({ search: value.name, open: false });
      if (this.props.onChange) {
         this.props.onChange(id);
      }
   }

   getOptions = () => {
      const { options } = this.props;
      const { search, open } = this.state;
      if (!open) return null;
      const searchLower = search.toLowerCase();
      const filtered = options.filter(option => (
         option.name.toLowerCase().indexOf(searchLower) > -1
      )).slice(0, 10);
      if (filtered.length === 0) return null;
      return (
         <Dropdown>
            {filtered.map(o => (
               <li key={o.id}>
                  <DropdownButton onClick={() => this.setValue(o.id)}>{o.name}</DropdownButton>
               </li>
            ))}
         </Dropdown>
      );
   }

   handleClickOutside = (event) => {
      const { state: { open }, wrapperRef } = this;

      if (open && wrapperRef && !wrapperRef.contains(event.target)) {
         this.setState({ open: false });
      }
   }

   changeSearch = ({ target: { value } }) => {
      this.setState({ search: value });
      if (this.props.value && this.props.onChange) {
         this.props.onChange(null);
      }
   }

   render() {
      const {
         props: {
            onChange, value, placeholder, disabled, ...props
         },
         state: {
            search,
         },
      } = this;

      const options = this.getOptions();

      return (
         <Container open={!!options} {...props} innerRef={(node) => { this.wrapperRef = node; }}>
            <Input
               placeholder={placeholder}
               value={search}
               onChange={this.changeSearch}
               onFocus={this.onFocus}
               disabled={disabled}
            />
            <Icon size={40}>arrow_drop_down</Icon>
            {options}
         </Container>
      );
   }
}

Select.propTypes = {
   onChange: PropTypes.func,
   width: PropTypes.string,
   disabled: PropTypes.bool,
   options: PropTypes.arrayOf(PropTypes.shape()).isRequired,
   value: PropTypes.oneOfType([
      PropTypes.string, PropTypes.number,
   ]),
   placeholder: PropTypes.string,
};

Select.defaultProps = {
   disabled: false,
   width: 'auto',
   value: '',
};
