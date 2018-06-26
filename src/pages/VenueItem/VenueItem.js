import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button, Section } from 'components';
import Categories from './VenueItemCategories';
import VenueItemHeader from './VenueItemHeader';

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

class VenueItem extends Component {
   state = {
      selectedCategory: categories[0],
   }

   render() {
      const {
         props: { venue },
         state: { selectedCategory },
      } = this;

      return (
         <div>
            <VenueItemHeader {...venue} />
            <ButtonContainer container flex>
               {categories.map(category => (
                  <Button
                     selected={selectedCategory.id === category.id}
                     T_4
                     key={category.id}
                     onClick={() => this.setState({ selectedCategory: category })}
                  >
                     {category.name}
                  </Button>
               ))}
            </ButtonContainer>
            {selectedCategory.Component && <selectedCategory.Component venue={venue} /> }
         </div>
      );
   }
}

function mapStateToProps({ venues }, { match: { params: { id } } }) {
   return {
      venue: venues.find(venue => venue.id === Number.parseInt(id, 10)),
   };
}

VenueItem.propTypes = {
   venue: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(VenueItem);
