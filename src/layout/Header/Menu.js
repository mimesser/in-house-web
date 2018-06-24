/* global document */
import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import menuIcon from './icons/hamburger';

const Wrapper = styled.div`
   position: relative;
`;

const Icon = styled.div`
   cursor: pointer;
   svg {
      height: 24px;
      width: 24px;
      fill: ${props => props.theme.A_4};
      :hover {
         fill: ${props => props.theme.A_3};
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
   visibility: ${props => (props.visable ? 'visible' : 'collapse')};
   background-color: ${props => props.theme.A_8};
   position: absolute;
   top: -20px;
   right: -10px;
   z-index: 20;
`;

const Header = styled.div`
   text-align: right;
   i {
      padding: 10px;
      cursor: pointer;
      color: ${props => props.theme.A_4};
      font-size: 28px;
      &:hover {
         color: ${props => props.theme.A_3};
      }
   }
`;

const MenuItem = styled(Link)`
   color: ${props => props.theme.A_3};
   &:hover {
      color: ${props => props.theme.A_2};
   }
`;

const Content = styled.div`
   padding: 20px 40px;
`;

const CloseIcon = styled.i``;

export default class Menu extends Component {
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
      const { state: { open }, wrapperRef } = this;

      if (open && wrapperRef && !wrapperRef.contains(event.target)) {
         this.setState({ open: false });
      }
   }

   render() {
      const { open } = this.state;

      return (
         <Wrapper innerRef={(node) => { this.wrapperRef = node; }}>
            <MenuIcon onClick={() => this.setState({ open: true })}>{menuIcon}</MenuIcon>
            <Dropdown visable={open}>
               <Header>
                  <CloseIcon className="material-icons" onClick={() => this.setState({ open: false })}>
                     close
                  </CloseIcon>
               </Header>
               <Content>
                  <MenuItem to="/venues">Venues</MenuItem>
               </Content>
            </Dropdown>
         </Wrapper>
      );
   }
}
