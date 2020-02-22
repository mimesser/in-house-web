import React, { useCallback, useState } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Link from 'next/link';

import { Loader, ClearButton, Icon, Button, Card, H1 } from '../../atoms';

import { selectInsiderChallengeForm, selectSelectedVenue, selectVenues } from '../../../store/venues';
import { selectInDemo } from '../../../store/demo';
import { VenueCard } from './VenueCard';
import { SearchBox, Layout, Results, NoResultsSearchLabel, SelectedItemArea, CantFindHouse } from './style';
import PrivateShare from '../Venue/PrivateShare';
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

const SearchPage = ({ venues, inDemo }) => {
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
        <Card>
          <Main>
            <ItemTitle>{name}</ItemTitle>
            <ItemText>{address}</ItemText>
            <ItemText>
              {city}, {state}
            </ItemText>
            <ItemText>{zipCode}</ItemText>
          </Main>
        </Card>
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
  const nothingFound = venuesToShow.length === 0;

  return (
    <Layout>
      <Results>
        <SearchBox
          placeholder={inDemo ? 'my house' : 'find your org'}
          value={filter}
          icon={<SearchBoxIcon applyFilter={applyFilter} clear={clearSearch} />}
          onChange={handleSearchChange}
        />
        {filter && nothingFound && <NoResultsSearchLabel>no results</NoResultsSearchLabel>}
        {venuesToShow.map((v, i) => (
          <VenueCard key={v.id} venue={v} showVenue={showVenue} withHelp={i === 0} />
        ))}
        {!inDemo && nothingFound && (
          <Link href="/quick-list" passHref>
            <Button icon="arrow-right">list your org</Button>
          </Link>
        )}
        {/* <PrivateShare type="venue" renderItem={renderSharePreview} getItemTitle={getTitleForShare} getVenue={getVenue} /> */}
      </Results>
      <SelectedItemArea>
        <CantFindHouse>
          <H1>can’t find your org?</H1>
          <Link href="/quick-list" passHref>
            <Button icon="arrow-right">add your organization</Button>
          </Link>
        </CantFindHouse>
      </SelectedItemArea>
    </Layout>
  );
};

const mapStateToProps = createStructuredSelector({
  venues: selectVenues,
  inDemo: selectInDemo,
  venue: selectSelectedVenue,
  challengeForm: selectInsiderChallengeForm,
});

export const VenueList = connect(mapStateToProps)(SearchPage);
