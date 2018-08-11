import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Overlay, Input } from 'components';
import { signup } from 'services/auth';

export default class Signup extends Component {
   static propTypes = {
      onClose: PropTypes.func.isRequired,
      openLogin: PropTypes.func.isRequired,
   }

   state = {
      email: '',
      password: '',
      error: null,
   }

   changeEmail = (email) => {
      this.setState({ email });
   }

   changePassword = (password) => {
      this.setState({ password });
   }

   submit = async (e) => {
      e.preventDefault();
      this.setState({ error: null });
      const {
         props: { onSuccess },
         state: { email, password },
      } = this;
      const error = await signup({ email, password });
      if (error) {
         this.setState({ error });
      } else if (onSuccess) {
         onSuccess();
      }
   }

   render() {
      const { email, password, error } = this.state;

      return (
         <Overlay onClose={() => this.props.onClose()}>
            <form onSubmit={this.submit} style={{ width: '300px' }}>
               <h1>Signup</h1>
               {
                  error && (
                     <div style={{ padding: '20px', color: '#fbb' }}>
                        {error}
                     </div>
                  )
               }
               <Input
                  E_1
                  value={email}
                  placeholder="Email"
                  onChange={this.changeEmail}
                  type="email"
               />
               <Input
                  E_1
                  value={password}
                  placeholder="Password"
                  onChange={this.changePassword}
                  type="password"
               />
               <Button I_3 type="submit">submit</Button>
               <Button I_3 onClick={this.props.openLogin}>to login</Button>
            </form>
         </Overlay>
      );
   }
}
