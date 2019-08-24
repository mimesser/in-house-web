import React, { useCallback } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Loader } from '../../atoms';

import { selectVenues } from '../../../store/venues';
import { VenueCard } from './VenueCard';

const List = ({ venues }) => {
  const showVenue = useCallback(venue => {
    const { id } = venue;
    Router.push(`/houses?id=${id}`, `/houses/${id}`, { shallow: true });
  }, []);

  if (!venues) {
    return <Loader big />;
  }

  return venues.map(v => <VenueCard key={v.id} venue={v} showVenue={showVenue} />);
};

const mapStateToProps = createStructuredSelector({
  venues: selectVenues,
});

export const VenueList = connect(mapStateToProps)(List);
