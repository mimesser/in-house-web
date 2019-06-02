import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'next/router';

import { Loader } from '../../atoms';

import { selectVenues, selectSelectedVenue, loadVenuesData, setSelectedVenue } from '../../../store/venues';
import { selectIndustriesMap } from '../../../store/aggregate';
import Venue from '../Venue';
import { VenueList } from '../VenueList';

const parseId = param => {
   if (!param) {
      return undefined;
   }
   const parsed = +param;
   return Number.isNaN(parsed) ? undefined : parsed;
};

const VenueLoader = ({ router, venues, industries, loadVenuesData, selectedVenue, setSelectedVenue }) => {
   const {
      query: { id: idParam },
   } = router;
   const id = parseId(idParam);
   useEffect(() => {
      if (!venues) {
         loadVenuesData();
      }
   }, []);

   useEffect(() => {
      if (id && venues && !selectedVenue) {
         const venueToSelect = venues.find(v => v.id === id);
         if (venueToSelect) {
            setSelectedVenue(venueToSelect);
         } else {
            router.push(`/houses`);
         }
      }
   }, [venues, selectedVenue]);

   if (!venues) {
      return <Loader big />;
   }

   return id ? <Venue id={id} /> : <VenueList venues={venues} industries={industries} />;
};

const mapState = createStructuredSelector({
   venues: selectVenues,
   selectedVenue: selectSelectedVenue,
   industries: selectIndustriesMap,
});

const mapDispatch = {
   loadVenuesData,
   setSelectedVenue,
};

export default connect(
   mapState,
   mapDispatch,
)(withRouter(VenueLoader));
