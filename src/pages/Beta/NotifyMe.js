import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { API_URL } from 'config';
import axios from 'axios';
import { Heading, Input, Button, Overlay } from 'components';

export default class NotifyMe extends Component {
   static propTypes = {
      onClose: PropTypes.func.isRequired,
   }

   state = {
      email: '',
   };

   onSubmit = async (e) => {
      e.preventDefault();

      const {
         props: { onClose },
         state: { email },
      } = this;

      try {
         await axios.post(`${API_URL}/email`, { email });
         onClose();
      } catch (err) {
         console.warn(err.response || err.message);
      }
   }

   handleEmailChange = (email) => {
      this.setState({ email });
   }

   render() {
      const { email } = this.state;

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
