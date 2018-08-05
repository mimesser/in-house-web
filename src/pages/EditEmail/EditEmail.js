import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Section, Input, Typography } from 'components';
import { connect } from 'react-redux';
import pageWrapper from 'utils/page-wrapper';
import { editEmail } from 'services/auth';
import history from '../../history';

class EditEmail extends Component {
   static propTypes = {
      email: PropTypes.string.isRequired,
   }

   state = {
      email: '',
      emailConfirm: '',
      password: '',
      error: null,
   }

   changeHandler = key => (value) => {
      this.setState({ [key]: value });
   }

   submit = async (e) => {
      e.preventDefault();

      this.setState({ error: null });
      const {
         state: {
            email, emailConfirm, password,
         },
      } = this;

      if (email !== emailConfirm) {
         this.setState({ error: 'Emails must match' });
         return;
      }

      const body = {
         email,
         password,
      };
      const error = await editEmail(body);
      if (error) {
         this.setState({ error });
      } else {
         history.goBack();
      }
   }

   render() {
      const {
         props: { email: existingEmail },
         state: {
            email, emailConfirm, password, error,
         },
      } = this;

      return (
         <Section container maxWidth={400}>
            <Typography H1>edit email</Typography>
            <Typography P2>current email: {existingEmail}</Typography>
            <form onSubmit={this.submit} style={{ width: '300px' }}>
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
                  placeholder="new email"
                  onChange={this.changeHandler('email')}
                  type="email"
                  required
               />
               <Input
                  E_1
                  value={emailConfirm}
                  placeholder="confirm email"
                  onChange={this.changeHandler('emailConfirm')}
                  type="email"
                  required
               />
               <Input
                  E_1
                  value={password}
                  placeholder="password"
                  onChange={this.changeHandler('password')}
                  type="password"
                  required
               />
               <Button I_3 type="submit">submit</Button>
            </form>
         </Section>
      );
   }
}

function mapStateToProps({ user: { email } }) {
   return {
      email,
   };
}

export default pageWrapper('10B')(connect(mapStateToProps)(EditEmail));
