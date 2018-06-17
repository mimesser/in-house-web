import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Venues(props) {
   const { venues } = props;

   return (
      <div className="Venues">
         <div className="header">
            <div className="header-logo" />
            <div className="header-text">nyc</div>
         </div>
         <h1 className="sub-header">
            anonymous ratings from insiders only.
         </h1>
         {venues && (
            <select>
               {venues.map(venue => (
                  <option value={venue.id} key={venue.id}>
                     {venue.name}
                  </option>
               ))}
            </select>
         )}
         <h3>Temp changes</h3>
      </div>
   );
}

Venues.propTypes = {
   venues: PropTypes.arrayOf(PropTypes.shape({})),
};

function mapStateToProps({ venues }) {
   return {
      venues,
   };
}

export default connect(mapStateToProps)(Venues);
