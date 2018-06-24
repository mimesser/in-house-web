import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import VenueItemHeader from './VenueItemHeader';


function VenueItem({ venue }) {
   return (
      <div>
         <VenueItemHeader {...venue} />
      </div>
   );
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
