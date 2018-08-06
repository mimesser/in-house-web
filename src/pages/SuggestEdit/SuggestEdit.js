import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Section, Input, Button, Typography } from 'components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import pageWrapper from 'utils/page-wrapper';
import { suggestEdit } from 'services/venue';
import history from '../../history';

class SuggestEdit extends Component {
   static propTypes = {
      venue: PropTypes.shape().isRequired,
   }

   state = {
      name: '',
      email: '',
      relation: '',
      comment: '',
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
            name, email, relation, comment,
         },
         props: { venue },
      } = this;

      const body = {
         userName: name,
         userEmail: email,
         venue: venue.id,
         relation,
         comment,
      };
      const error = await suggestEdit(body);
      if (error) {
         this.setState({ error });
      } else {
         history.goBack();
      }
   }

   render() {
      const {
         state: {
            name, email, relation, comment, error,
         },
         props: { venue },
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
               <Typography H2>suggest edit</Typography>
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
                     value={relation}
                     onChange={this.changeHandler('relation')}
                     placeholder="who are you in relationship to this place?"
                     required
                  />
               </div>
               <div style={{ margin: '20px 0' }}>
                  <Typography S2>
                     <Link to={`/venues/${venue.id}/apply-as-owner`}>click here</Link> if you
                     are an owner who would like the unique ability
                     to respond publicly to blabs (and other special ownership
                     privileges)
                  </Typography>
               </div>
               <div style={{ margin: '20px 0' }}>
                  <Input
                     E_1
                     value={comment}
                     onChange={this.changeHandler('comment')}
                     placeholder="comment or correction"
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

export default pageWrapper('7C')(connect(mapStateToProps)(SuggestEdit));
