import React, { Component } from 'react';
import { Section, Input, Button } from 'components';
import { pageWrapper, times } from 'utils';
import { createIndustry } from 'services/industry';
import history from '../../history';
import RequestNewIndustryConfirmation from './RequestNewIndustryConfirmation';

class RequestNewIndustry extends Component {
   state = {
      name: '',
      ...times(10, c => ({ [`category${c}`]: '' })),
   }

   onSuccessConfirm = () => {
      history.goBack();
   }

   changeHandler = key => (value) => {
      this.setState({ [key]: value });
   }

   submit = async (e) => {
      e.preventDefault();

      this.setState({ error: null });
      const {
         name,
      } = this.state;

      const body = {
         name,
         categories: times(10, c => this.state[`category${c}`]).filter(c => c),
      };
      const error = await createIndustry(body);
      if (error) {
         this.setState({ error });
      } else {
         this.setState({ success: true });
      }
   }

   render() {
      const {
         state: {
            name, error, success,
         },
      } = this;

      return (
         <form onSubmit={this.submit}>
            {success && <RequestNewIndustryConfirmation onClose={this.onSuccessConfirm} />}
            {
               error && (
                  <div style={{ padding: '20px', color: '#fbb' }}>
                     {error}
                  </div>
               )
            }
            <Section container centerAlign maxWidth={400}>
               <div style={{ margin: '0 auto', width: '400px' }}>
                  <Input
                     E_1
                     value={name}
                     onChange={this.changeHandler('name')}
                     placeholder="name"
                     required
                  />
               </div>
               <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {times(10, c => (
                     <div key={c} style={{ margin: '10px 0' }}>
                        <Input
                           E_1
                           value={this.state[`category${c}`]}
                           onChange={this.changeHandler(`category${c}`)}
                           placeholder={`category${c + 1}`}
                        />
                     </div>
                  ))}
               </div>
               <Button I_1 type="submit">Submit</Button>
            </Section>
         </form>
      );
   }
}

export default pageWrapper('7B')(RequestNewIndustry);
