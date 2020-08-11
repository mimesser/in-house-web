import React, { useCallback, useState } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Link from 'next/link';

import styled from 'styled-components';
import { spacing } from '../../../style';
import { Loader, ClearButton, Icon, Button, Card, H1, Portal } from '../../atoms';
import PrivateShare from '../Venue/PrivateShare';
import {
  selectInsiderChallengeForm,
  selectSelectedVenue,
  selectVenues,
  selectPolls,
  selectSelectedPoll,
} from '../../../store/venues';
import { selectEsgCategories } from '../../../store/aggregate';
import { selectInDemo } from '../../../store/demo';
import { VenueCard } from './VenueCard';
import { SearchBox, Layout, Results, NoResultsSearchLabel, SelectedItemArea } from './style';
import { Main, ItemText, ItemTitle } from '../Venue/tabStyle';

const BetaLink = styled(Button)`
  margin: auto;
  min-height: ${spacing.xl};
  border: none;
  bacground-color: white;
  padding: 0;
`;

const BetaCard = styled(BetaLink)`
  margin: 0;
  width: 100%;

  padding: ${spacing.md};
  min-height: ${spacing.xxxl};
  margin-bottom: ${spacing.xl};
  > a {
    width: 100%;
  }
`;

const SearchBoxIcon = ({ applyFilter, clear }) =>
  applyFilter ? (
    <ClearButton onClick={clear}>
      <Icon icon="close" />
    </ClearButton>
  ) : (
    <Icon icon="search" />
  );

const findVenue = (id, venues) => {
  const venue = id && venues && venues.find((t) => t.id === id);

  return venue;
};

const SearchPage = ({ venues, inDemo, categories }) => {
  const [filter, setFilter] = useState('');
  const handleSearchChange = useCallback((e) => setFilter(e.currentTarget.value.toLowerCase()), []);
  const clearSearch = useCallback(() => setFilter(''), []);
  const showVenue = useCallback((venue) => {
    const { id } = venue;
    Router.push(`/houses?id=${id}`, `/houses/${id}`, { shallow: true });
  }, []);

  const renderSharePreview = useCallback(
    (id) => {
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

  const getVenue = useCallback((id) => findVenue(id, venues), [venues]);

  const getTitleForShare = useCallback((id) => findVenue(id, venues).name, [venues]);
  if (!venues) {
    return <Loader big />;
  }
  const findCategoryRating = (id, categoryRatings) => {
    const cat = categoryRatings && categoryRatings.find((c) => c.id === id);
    return cat && cat.rating;
  };

  const applyFilter = !!filter;
  const venuesToShow = applyFilter ? venues.filter((v) => v.name.toLowerCase().includes(filter)) : venues;
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
        {venuesToShow.map((v, i) => {
          const venueCategories =
            categories &&
            categories.map((category, i) => {
              return { ...category, rating: findCategoryRating(category.id, v.rateTagCategories) };
            });
          return (
            <VenueCard
              key={v.id}
              venue={v}
              showVenue={showVenue}
              withHelp={i === 0}
              categoryRatings={venueCategories}
            />
          );
        })}
        {!inDemo && (
          <section>
            {/* <Link href="/list" passHref> */}
            <BetaCard icon="arrow-right" href="/list-house">
              list my workplace
            </BetaCard>
            {/* </Link> */}
          </section>
        )}
        {venues && (
          <PrivateShare
            type="venue"
            renderItem={renderSharePreview}
            getItemTitle={getTitleForShare}
            getVenue={getVenue}
          />
        )}
      </Results>
      <SelectedItemArea>
        <BetaLink>
          <Link href="/list-house" passHref>
            <Button icon="arrow-right">list my workplace</Button>
          </Link>
        </BetaLink>
      </SelectedItemArea>
    </Layout>
  );
};

const mapStateToProps = createStructuredSelector({
  venues: selectVenues,
  inDemo: selectInDemo,
  venue: selectSelectedVenue,
  challengeForm: selectInsiderChallengeForm,
  categories: selectEsgCategories,
});

export const VenueList = connect(mapStateToProps)(SearchPage);
