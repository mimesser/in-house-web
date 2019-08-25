import React, { useCallback, useState } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Link from 'next/link';

import { Loader, IconButton, Icon } from '../../atoms';

import { selectVenues } from '../../../store/venues';
import { VenueCard } from './VenueCard';
import { ListYourHouse, SearchBox, Layout } from './style';

const SearchBoxIcon = ({ applyFilter, clear }) =>
  applyFilter ? (
    <IconButton onClick={clear}>
      <Icon icon="close" />
    </IconButton>
  ) : (
    <Icon icon="search" />
  );

const List = ({ venues }) => {
  const [filter, setFilter] = useState('');
  const handleSearchChange = useCallback(e => setFilter(e.currentTarget.value.toLowerCase()), []);
  const clearSearch = useCallback(() => setFilter(''), []);
  const showVenue = useCallback(venue => {
    const { id } = venue;
    Router.push(`/houses?id=${id}`, `/houses/${id}`, { shallow: true });
  }, []);

  if (!venues) {
    return <Loader big />;
  }

  const applyFilter = !!filter;
  const venuesToShow = applyFilter ? venues.filter(v => v.name.toLowerCase().includes(filter)) : venues;

  return (
    <Layout>
      <SearchBox
        placeholder="beta houses"
        value={filter}
        icon={<SearchBoxIcon applyFilter={applyFilter} clear={clearSearch} />}
        onChange={handleSearchChange}
      />
      {venuesToShow.map(v => (
        <VenueCard key={v.id} venue={v} showVenue={showVenue} />
      ))}
      <Link href="/feedback">
        <ListYourHouse>list your house</ListYourHouse>
      </Link>
    </Layout>
  );
};

const mapStateToProps = createStructuredSelector({
  venues: selectVenues,
});

export const VenueList = connect(mapStateToProps)(List);
