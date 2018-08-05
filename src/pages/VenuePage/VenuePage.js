import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button, Section, Overlay, Input } from 'components';
import pageWrapper from 'utils/page-wrapper';
import { submitAnswer } from 'services/mink';
import Categories from './VenuePageCategories';
import Header from './VenuePageHeader';

const ButtonContainer = styled(Section)`
   button + button {
      margin-left: 40px;
   }
`;

const categories = [
   { id: 'categories', name: 'Categories', Component: Categories },
   { id: 'feedback', name: 'Feedback' },
   { id: 'minks', name: 'Minks' },
];

class VenuePage extends Component {
   static propTypes = {
      isInsider: PropTypes.bool.isRequired,
      venue: PropTypes.shape().isRequired,
   }

   state = {
      selectedCategory: categories[0],
      answer: '',
   }

   changeAnswer = (answer) => {
      this.setState({ answer });
   }

   submit = async (e) => {
      e.preventDefault();
      this.setState({ error: null });
      const error = await submitAnswer(this.props.venue.minks[0]._id, this.state.answer);
      if (error) {
         this.setState({ error });
      }
   }

   renderMink = () => {
      const { question } = this.props.venue.minks[0];
      const { answer, error } = this.state;
      return (
         <Overlay>
            {
               error && (
                  <div style={{ padding: '20px', color: '#fbb' }}>
                     {error}
                  </div>
               )
            }
            <form onSubmit={this.submit} style={{ width: '300px' }}>
               Question: {question}
               <Input E_1 value={answer} placholder="Answer" onChange={this.changeAnswer} />
               <Button I_3 type="submit">submit</Button>
            </form>
         </Overlay>
      );
   }

   render() {
      const {
         props: { venue, isInsider },
         state: { selectedCategory },
      } = this;

      return (
         <div>
            {!isInsider && this.renderMink()}
            <Header {...venue} />
            <ButtonContainer container flex>
               {categories.map(category => (
                  <Button
                     selected={isInsider && selectedCategory.id === category.id}
                     T_4
                     key={category.id}
                     onClick={() => this.setState({ selectedCategory: category })}
                  >
                     {category.name}
                  </Button>
               ))}
            </ButtonContainer>
            {isInsider && selectedCategory.Component &&
               <selectedCategory.Component venue={venue} /> }
         </div>
      );
   }
}

function mapStateToProps({ venues, user }, { match: { params: { id } } }) {
   return {
      isInsider: user.insider.includes(id),
      venue: venues.find(venue => venue._id === id),
   };
}

export default pageWrapper('13A.1')(connect(mapStateToProps)(VenuePage));
