import React, { useCallback, useState } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Link from 'next/link';

import { Loader, ClearButton, Icon, Button } from '../../atoms';

import { selectVenues } from '../../../store/venues';
import { selectInDemo } from '../../../store/demo';
import { VenueCard } from './VenueCard';
import { SearchBox, Layout, NoResults } from './style';
import PrivateShare from '../Venue/PrivateShare';
import { SharePreviewCard } from '../Venue/sharePreviewStyle';
import { Main, ItemText, ItemTitle } from '../Venue/tabStyle';

const SearchBoxIcon = ({ applyFilter, clear }) =>
  applyFilter ? (
    <ClearButton onClick={clear}>
      <Icon icon="close" />
    </ClearButton>
  ) : (
    <Icon icon="search" />
  );

const findVenue = (id, venues) => {
  const venue = venues.find(t => t.id === id);
  if (!venue) {
    throw new Error(`Can't find venue ${id}`);
  }
  return venue;
};

const List = ({ venues, inDemo }) => {
  const [filter, setFilter] = useState('');
  const handleSearchChange = useCallback(e => setFilter(e.currentTarget.value.toLowerCase()), []);
  const clearSearch = useCallback(() => setFilter(''), []);
  const showVenue = useCallback(venue => {
    const { id } = venue;
    Router.push(`/houses?id=${id}`, `/houses/${id}`, { shallow: true });
  }, []);

  const renderSharePreview = useCallback(
    id => {
      const {
        name,
        venueInfo: { address, city, state, zipCode },
      } = findVenue(id, venues);

      return (
        <SharePreviewCard>
          <Main>
            <ItemTitle>{name}</ItemTitle>
            <ItemText>{address}</ItemText>
            <ItemText>
              {city}, {state}
            </ItemText>
            <ItemText>{zipCode}</ItemText>
          </Main>
        </SharePreviewCard>
      );
    },
    [venues],
  );

  const getVenue = useCallback(id => findVenue(id, venues), [venues]);

  const getTitleForShare = useCallback(id => findVenue(id, venues).name, [venues]);
  if (!venues) {
    return <Loader big />;
  }

  const applyFilter = !!filter;
  const venuesToShow = applyFilter ? venues.filter(v => v.name.toLowerCase().includes(filter)) : venues;

  return (
    <Layout>
      <SearchBox
        placeholder={inDemo ? 'my house' : 'find your org'}
        value={filter}
        icon={<SearchBoxIcon applyFilter={applyFilter} clear={clearSearch} />}
        onChange={handleSearchChange}
      />
      {filter && venuesToShow.length === 0 && <NoResults>no results</NoResults>}
      {venuesToShow.map((v, i) => (
        <VenueCard key={v.id} venue={v} showVenue={showVenue} withHelp={i === 0} />
      ))}
      {!inDemo && (
        <Link href="/quick-list" passHref>
          <Button icon="arrow-right">list your org</Button>
        </Link>
      )}
      <PrivateShare type="venue" renderItem={renderSharePreview} getItemTitle={getTitleForShare} getVenue={getVenue} />
    </Layout>
  );
};

const mapStateToProps = createStructuredSelector({
  venues: selectVenues,
  inDemo: selectInDemo,
});

export const VenueList = connect(mapStateToProps)(List);
