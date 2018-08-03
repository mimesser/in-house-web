/* global document */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import menuIcon from './icons/hamburger';
import Login from './Login';
import Signup from './Signup';

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

const MenuItem = styled.div`
   display: block;
   color: ${props => props.theme.A_3};
   padding: 10px 20px;
   white-space: nowrap;
   &:hover {
      color: ${props => props.theme.A_2};
   }
`;

const MenuItemLink = styled(Link)`
   display: block;
   color: ${props => props.theme.A_3};
   padding: 10px 20px;
   white-space: nowrap;
   &:hover {
      color: ${props => props.theme.A_2};
   }
`;

const Content = styled.div`
   padding: 10px 0;
`;

const CloseIcon = styled.i``;

class Menu extends Component {
   static propTypes = {
      user: PropTypes.shape().isRequired,
   }

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

   openLogin = () => {
      this.setState({ modal: 'login' });
   }

   openSignup = () => {
      this.setState({ modal: 'signup' });
   }

   closeModal = () => {
      this.setState({ modal: null });
   }

   renderModal = () => {
      const { user } = this.props;
      const { modal } = this.state;

      if (user.email) {
         return null;
      }

      switch (modal) {
         case 'login': return <Login onClose={this.closeModal} />;
         case 'signup': return <Signup onClose={this.closeModal} />;
         default: return null;
      }
   }

   render() {
      const { open } = this.state;
      const { user } = this.props;

      return (
         <Wrapper innerRef={(node) => { this.wrapperRef = node; }}>
            {this.renderModal()}
            <MenuIcon onClick={() => this.setState({ open: true })}>{menuIcon}</MenuIcon>
            <Dropdown visable={open}>
               <Header>
                  <CloseIcon className="material-icons" onClick={() => this.setState({ open: false })}>
                     close
                  </CloseIcon>
               </Header>
               <Content>
                  <MenuItemLink to="/venues">Venues</MenuItemLink>
                  <MenuItemLink to="/kitchen-sink">Kitchen Sink</MenuItemLink>
                  {user.email
                     ? <MenuItem onClick={this.openUserInfo}>User Info</MenuItem>
                     : [
                        <MenuItem key={0} onClick={this.openLogin}>Login</MenuItem>,
                        <MenuItem key={1} onClick={this.openSignup}>Signup</MenuItem>,
                     ]}
               </Content>
            </Dropdown>
         </Wrapper>
      );
   }
}

function mapStateToProps({ user }) {
   return {
      user,
   };
}

export default connect(mapStateToProps)(Menu);
