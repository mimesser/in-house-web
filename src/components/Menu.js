/* global document */
import React, { Component } from 'react';
import styled from 'styled-components';
import menuIcon from './hamburger';

const Wrapper = styled.div`
   position: relative;
`;

const Icon = styled.div`
   cursor: pointer;
   svg {
      height: 24px;
      width: 24px;
      fill #555;
      :hover {
         fill #bbb;
      }
   }
`;

const MenuIcon = Icon.extend`
   margin-left: 40px;
   svg {
      width: 20px;
   }
`;

const Dropdown = styled.div`
   width: 400px;
   height: 400px;
   background-color: #fff;
   position: absolute;
   top: -20px;
   right: 0;
`;

export default class Header extends Component {
   state = {
      open: false,
   }

   componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside);
   }

   componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
   }

   handleClickOutside = (event) => {
      console.log(event, this.wrapperRef);
      if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
         console.log('You clicked outside of me!');
      }
   }

   render() {
      const { open } = this.state;

      return (
         <Wrapper
            innerRef={(node) => { this.wrapperRef = node; }}
            onClick={() => this.setState({ open: true })}
         >
            <MenuIcon>{menuIcon}</MenuIcon>
            {open && <Dropdown />}
         </Wrapper>
      );
   }
}
