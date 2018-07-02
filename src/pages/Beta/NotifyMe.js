import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { API_URL } from 'config';
import axios from 'axios';
import { Typography, Input, Button, Overlay } from 'components';
import styled from 'styled-components';

const InputContainer = styled.div`
   margin: 30px 0;
`;

export default class NotifyMe extends Component {
   static propTypes = {
      onClose: PropTypes.func.isRequired,
   }

   state = {
      email: '',
      submitted: false,
   };

   onSubmit = (e) => {
      e.preventDefault();

      const {
         state: { email },
      } = this;

      this.setState({ submitted: true });
      try {
         axios.post(`${API_URL}/email`, { email });
      } catch (err) {
         console.warn(err.response || err.message);
      }
   }

   handleEmailChange = (email) => {
      this.setState({ email });
   }

   render() {
      const { email, submitted } = this.state;

      if (submitted) {
         return (
            <Overlay onClose={this.props.onClose}>
               <Typography T2>thanks</Typography>
               <InputContainer>
                  <Typography P1>we will let you know when the platform is ready</Typography>
               </InputContainer>
               <Button I_3 onClick={this.props.onClose}>ok</Button>
            </Overlay>
         );
      }

      return (
         <Overlay onClose={this.props.onClose}>
            <form onSubmit={this.onSubmit}>
               <Typography T2>notify me when live</Typography>
               <InputContainer>
                  <Input E_1 type="email" placeholder="email" width="260px" value={email} onChange={this.handleEmailChange} />
               </InputContainer>
               <Button I_3 type="submit">submit</Button>
            </form>
         </Overlay>
      );
   }
}
