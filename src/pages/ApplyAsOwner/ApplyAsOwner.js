import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Section, Input, Button, Typography } from 'components';
import { connect } from 'react-redux';
import pageWrapper from 'utils/page-wrapper';
import { applyAsOwner } from 'services/venue';
import history from '../../history';

class ApplyAsOwner extends Component {
   static propTypes = {
      venue: PropTypes.shape().isRequired,
   }

   state = {
      name: '',
      email: '',
      relation: '',
      message: '',
      phone: '',
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
            name, email, relation, phone, message,
         },
         props: { venue },
      } = this;

      const body = {
         userName: name,
         userEmail: email,
         venue,
         relation,
         phone,
         message,
      };
      const error = await applyAsOwner(body);
      if (error) {
         this.setState({ error });
      } else {
         history.push(`/venues/${venue.id}`);
      }
   }

   render() {
      const {
         state: {
            name, email, relation, phone, message, error,
         },
      } = this;

      return (
         <form onSubmit={this.submit}>
            {
               error && (
                  <div style={{ padding: '20px', color: '#fbb' }}>
                     {error}
                  </div>
               )
            }
            <Section container maxWidth={400}>
               <Typography H2>apply as owner</Typography>
               <div style={{ margin: '20px 0' }}>
                  <Input
                     E_1
                     value={name}
                     onChange={this.changeHandler('name')}
                     placeholder="name"
                     required
                  />
               </div>
               <div style={{ margin: '20px 0' }}>
                  <Input
                     E_1
                     type="email"
                     value={email}
                     onChange={this.changeHandler('email')}
                     placeholder="email"
                     required
                  />
               </div>
               <div style={{ margin: '20px 0' }}>
                  <Input
                     E_1
                     type="phone"
                     value={phone}
                     onChange={this.changeHandler('phone')}
                     placeholder="phone"
                     required
                  />
               </div>
               <div style={{ margin: '20px 0' }}>
                  <Input
                     E_1
                     value={relation}
                     onChange={this.changeHandler('relation')}
                     placeholder="who are you in relationship to this place?"
                     required
                  />
               </div>
               <div style={{ margin: '20px 0' }}>
                  <Input
                     E_1
                     value={message}
                     onChange={this.changeHandler('message')}
                     placeholder="message"
                  />
               </div>
               <Button I_1 type="submit">Submit</Button>
            </Section>
         </form>
      );
   }
}

function mapStateToProps({ venues }, { match: { params: { id } } }) {
   return {
      venue: venues.find(venue => venue.id === id),
   };
}

export default pageWrapper('7E')(connect(mapStateToProps)(ApplyAsOwner));
