import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { API_URL } from 'config';
import axios from 'axios';
import { Heading, Input, Button, Overlay, Text } from 'components';

export default class NotifyMe extends Component {
   static propTypes = {
      onClose: PropTypes.func.isRequired,
   }

   state = {
      email: '',
      submitted: false,
   };

   onSubmit = async (e) => {
      e.preventDefault();

      const {
         state: { email },
      } = this;

      try {
         await axios.post(`${API_URL}/email`, { email });
         this.setState({ submitted: true });
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
               <Heading T2>thanks</Heading>
               <br />
               <Text P1>we will let you know when the platform is ready</Text>
               <br />
               <Button I_3 onClick={this.props.onClose}>ok</Button>
            </Overlay>
         );
      }

      return (
         <Overlay onClose={this.props.onClose}>
            <form onSubmit={this.onSubmit}>
               <Heading T2>notify me when live</Heading>
               <br />
               <Input E_1 type="email" placeholder="email" width="260px" value={email} onChange={this.handleEmailChange} />
               <br />
               <Button I_3 type="submit">submit</Button>
            </form>
         </Overlay>
      );
   }
}
