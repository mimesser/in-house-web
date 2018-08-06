import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Section, Select, Input, Button } from 'components';
import { connect } from 'react-redux';
import pageWrapper from 'utils/page-wrapper';
import { createVenue } from 'services/venue';
import history from '../../history';

class ListVenue extends Component {
   static propTypes = {
      states: PropTypes.arrayOf(PropTypes.shape({})),
      industries: PropTypes.arrayOf(PropTypes.shape({})),
      cities: PropTypes.arrayOf(PropTypes.shape({})),
   };

   state = {
      state: '',
   }

   getItems = (itemId) => {
      const { industries } = this.props;
      const {
         item1, item2, item3, industry,
      } = this.state;
      const items = [item1, item2, item3].filter(i => i !== itemId);

      if (industry) {
         return industries
            .find(i => i.id === industry)
            .items
            .filter(i => i.id === itemId || !items.includes(i.id));
      }
      return [];
   }

   changeState = (state) => {
      this.setState({ state });
   }

   changeHandler = key => (value) => {
      this.setState({ [key]: value });
   }

   submit = async (e) => {
      e.preventDefault();

      this.setState({ error: null });
      const {
         name, address, city, zip, phone, industry, item1, item2, item3,
         minkQuestion, minkAnswer,
      } = this.state;

      const body = {
         mink: {
            question: minkQuestion,
            answer: minkAnswer,
         },
         name,
         address,
         city,
         zip,
         phone,
         industry,
         items: [item1, item2, item3].filter(i => i),
      };
      const error = await createVenue(body);
      if (error) {
         this.setState({ error });
      } else {
         history.goBack();
      }
   }

   render() {
      const {
         props: { states, industries, cities },
         state: {
            state, name, address, city, zip, phone, industry, item1, item2, item3,
            minkQuestion, minkAnswer, error,
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
            <Section container centerAlign maxWidth={800}>
               <div style={{ margin: '0 auto', width: '400px' }}>
                  <Select
                     G_1
                     options={states.map(s => ({
                        id: s.id,
                        name: s.name,
                     }))}
                     onChange={this.changeHandler('state')}
                     value={state}
                     placeholder="state"
                  />
               </div>
               <div style={{ display: 'flex' }}>
                  <div style={{ flex: 1, marginRight: '10px' }}>
                     <div style={{ margin: '20px 0' }}>
                        <Input
                           E_1
                           value={name}
                           onChange={this.changeHandler('name')}
                           placeholder="name"
                        />
                     </div>
                     <div style={{ margin: '20px 0' }}>
                        <Input
                           E_1
                           value={address}
                           onChange={this.changeHandler('address')}
                           placeholder="address"
                        />
                     </div>
                     <div style={{ margin: '20px 0' }}>
                        <Select
                           G_1
                           options={cities.map(s => ({
                              id: s.id,
                              name: s.name,
                           }))}
                           onChange={this.changeHandler('city')}
                           value={city}
                           placeholder="city"
                           disabled={!state}
                        />
                     </div>
                     <div style={{ margin: '20px 0' }}>
                        <Input
                           E_1
                           value={zip}
                           onChange={this.changeHandler('zip')}
                           placeholder="zip code"
                        />
                     </div>
                     <div style={{ margin: '20px 0' }}>
                        <Input
                           E_1
                           value={phone}
                           onChange={this.changeHandler('phone')}
                           placeholder="phone (optional)"
                        />
                     </div>
                  </div>
                  <div style={{ flex: 1, marginLeft: '10px' }}>
                     <div style={{ margin: '20px 0' }}>
                        <Select
                           G_1
                           options={industries.map(s => ({
                              id: s.id,
                              name: s.name,
                           }))}
                           onChange={this.changeHandler('industry')}
                           value={industry}
                           placeholder="industry"
                        />
                     </div>
                     <div style={{ margin: '20px 0' }}>
                        <Select
                           G_1
                           options={this.getItems(item1).map(s => ({
                              id: s.id,
                              name: s.name,
                           }))}
                           onChange={this.changeHandler('item1')}
                           value={item1}
                           placeholder="item1"
                           disabled={!industry}
                        />
                     </div>
                     <div style={{ margin: '20px 0' }}>
                        <Select
                           G_1
                           options={this.getItems(item2).map(s => ({
                              id: s.id,
                              name: s.name,
                           }))}
                           onChange={this.changeHandler('item2')}
                           value={item2}
                           placeholder="item2"
                           disabled={!industry}
                        />
                     </div>
                     <div style={{ margin: '20px 0' }}>
                        <Select
                           G_1
                           options={this.getItems(item3).map(s => ({
                              id: s.id,
                              name: s.name,
                           }))}
                           onChange={this.changeHandler('item3')}
                           value={item3}
                           placeholder="item3"
                           disabled={!industry}
                        />
                     </div>
                  </div>
               </div>
               <div style={{ margin: '0 auto', width: '400px' }}>
                  <div style={{ margin: '20px 0' }}>
                     <Input
                        E_1
                        value={minkQuestion}
                        onChange={this.changeHandler('minkQuestion')}
                        placeholder="mink question"
                     />
                  </div>
                  <div style={{ margin: '20px 0' }}>
                     <Input
                        E_1
                        value={minkAnswer}
                        onChange={this.changeHandler('minkAnswer')}
                        placeholder="mink answer"
                        required
                     />
                  </div>
               </div>
               <Button I_1 type="submit">Submit</Button>
            </Section>
         </form>
      );
   }
}


function mapStateToProps({ states, industries, cities }) {
   return {
      states,
      industries,
      cities,
   };
}

export default pageWrapper('7B')(connect(mapStateToProps)(ListVenue));
