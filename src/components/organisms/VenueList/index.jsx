import React, { useCallback, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Link from 'next/link';
import styled from 'styled-components';
import { spacing } from '../../../style';
import { Loader, ClearButton, Icon, Button, Card, H1, Portal } from '../../atoms';
import PrivateShare from '../Venue/PrivateShare';
import { setSelectedVenue, selectVenues, selectPolls } from '../../../store/venues';
import { selectEsgCategories } from '../../../store/aggregate';
import { selectInDemo } from '../../../store/demo';
import { VenueCard } from './VenueCard';
import { SearchBox, Layout, Results, NoResultsSearchLabel, SelectedItemArea } from './style';
import { Main, ItemText, ItemTitle } from '../Venue/tabStyle';
import { formatMovementURL } from '../../../utils/format';

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

export const findCategoryRating = (id, categoryRatings) => {
  const cat = categoryRatings && categoryRatings.find((c) => c.id === id);
  return cat && cat.rating;
};

const SearchPage = ({ setSelectedVenue, venues, inDemo, categories }) => {
  const router = useRouter();
  const [filter, setFilter] = useState(router.query.q);
  const handleSearchChange = useCallback((e) => setFilter(e.currentTarget.value.toLowerCase()), []);
  const clearSearch = useCallback(() => setFilter(''), []);
  const showVenue = useCallback(
    (venue) => {
      const {
        id,
        name,
        industry: { lite },
      } = venue;

      setSelectedVenue(venue);
      Router.push(
        `/houses?id=${id}&tab=${lite ? 'post' : 'rate'}}`,
        `/${lite ? 'movement' : 'houses'}/${lite ? formatMovementURL(name) : id}/${
          lite ? 'post' : 'rate'
        }`,
        { shallow: true },
      );
    },
    [setSelectedVenue],
  );

  const renderSharePreview = useCallback(
    (id) => {
      const venue = findVenue(id, venues);
      const venueCategories =
        categories &&
        categories.map((category) => {
          return { ...category, rating: findCategoryRating(category.id, venue.rateTagCategories) };
        });

      return <VenueCard venue={venue} categoryRatings={venueCategories} />;
    },
    [venues],
  );

  const getVenue = useCallback((id) => findVenue(id, venues), [venues]);

  const getTitleForShare = useCallback((id) => findVenue(id, venues).name, [venues]);
  if (!venues) {
    return <Loader big />;
  }

  const applyFilter = !!filter;
  const venuesToShow = applyFilter
    ? venues.filter((v) => v.name && v.name.toLowerCase().includes(filter))
    : venues;
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
  categories: selectEsgCategories,
});

const mapDispatchToProps = {
  setSelectedVenue,
};

export const VenueList = connect(mapStateToProps, mapDispatchToProps)(SearchPage);
