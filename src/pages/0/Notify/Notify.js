import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { API_URL } from 'config';
import axios from 'axios';
import { Overlay } from 'components';

import NotifyConfirm from './NotifyConfirm';
import NotifyMe from './NotifyMe';

export default class Notify extends Component {
   static propTypes = {
      onClose: PropTypes.func.isRequired,
   }

   state = {
      email: '',
      submitted: false,
   };

   submit = (e) => {
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

   changeEmail = (email) => {
      this.setState({ email });
   }

   renderContent = () => {
      const {
         props: { onClose },
         state: { email, submitted },
      } = this;

      if (submitted) {
         return (
            <NotifyConfirm onConfirm={onClose} />
         );
      }

      return (
         <NotifyMe
            onSubmit={this.submit}
            email={email}
            onEmailChange={this.changeEmail}
         />
      );
   }

   render() {
      return (
         <Overlay onClose={this.props.onClose}>
            {this.renderContent()}
         </Overlay>
      );
   }
}
