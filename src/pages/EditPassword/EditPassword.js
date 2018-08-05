import React, { Component } from 'react';
import { Button, Section, Input, Typography } from 'components';
import pageWrapper from 'utils/page-wrapper';
import { editPassword } from 'services/auth';
import history from '../../history';

class EditPassword extends Component {
   state = {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
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
            currentPassword, newPassword, newPasswordConfirm,
         },
      } = this;

      if (newPassword !== newPasswordConfirm) {
         this.setState({ error: 'Passwords must match' });
         return;
      }

      const body = {
         currentPassword,
         newPassword,
      };
      const error = await editPassword(body);
      if (error) {
         this.setState({ error });
      } else {
         history.goBack();
      }
   }

   render() {
      const {
         state: {
            currentPassword, newPassword, newPasswordConfirm, error,
         },
      } = this;

      return (
         <Section container maxWidth={400}>
            <Typography H1>edit password</Typography>
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
                  value={currentPassword}
                  placeholder="current password"
                  onChange={this.changeHandler('currentPassword')}
                  type="password"
                  required
               />
               <Input
                  E_1
                  value={newPassword}
                  placeholder="new password"
                  onChange={this.changeHandler('newPassword')}
                  type="password"
                  required
               />
               <Input
                  E_1
                  value={newPasswordConfirm}
                  placeholder="re-enter new password"
                  onChange={this.changeHandler('newPasswordConfirm')}
                  type="password"
                  required
               />
               <Button I_3 type="submit">submit</Button>
            </form>
         </Section>
      );
   }
}

export default pageWrapper('10C')(EditPassword);
