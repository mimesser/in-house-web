import React, { useCallback, useState } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Link from 'next/link';

import styled from 'styled-components';
import { spacing } from '../../../style';
import { Loader, ClearButton, Icon, Button, Card, H2, Break } from '../../atoms';

import {
  selectInsiderChallengeForm,
  selectSelectedVenue,
  selectVenues,
  selectPolls,
  selectSelectedPoll,
} from '../../../store/venues';
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

const PageHeader = styled.div`
  margin: ${spacing.xl} 0 ${spacing.lg};
  margin-bottom: ${spacing.xxl};
`;

const SearchPage = ({ venues, inDemo }) => {
  const showVenue = useCallback((venue) => {
    const { id } = venue;
    Router.push(`/polls?id=${id}`, `/polls/${id}`, { shallow: true });
  }, []);

  if (!venues) {
    return <Loader big />;
  }

  const venuesToShow = venues;
  const nothingFound = venuesToShow.length === 0;

  return (
    <Layout>
      <Results>
        <PageHeader>
          <H2>essential worker polls</H2>
          <Break />
          <>
            during the current state of the world, we have created this space to allow essential workers to connect and
            share their realities on the ground so that thei leadership can hear them
          </>
        </PageHeader>
        {nothingFound && <NoResultsSearchLabel>no polls</NoResultsSearchLabel>}
        {venuesToShow.map((v, i) => (
          <VenueCard key={v.id} venue={v} showVenue={showVenue} withHelp={i === 0} />
        ))}
        {!inDemo && (
          <section>
            {/* <Link href="/beta-list" passHref> */}
            <BetaCard icon="arrow-right" href="/beta-list">
              request your industry
            </BetaCard>
            {/* </Link> */}
          </section>
        )}
        {/* <PrivateShare type="venue" renderItem={renderSharePreview} getItemTitle={getTitleForShare} getVenue={getVenue} /> */}
      </Results>
      <SelectedItemArea>
        <BetaLink>
          <Link href="/beta-list" passHref>
            <Button icon="arrow-right">beta-list my workplace</Button>
          </Link>
        </BetaLink>
      </SelectedItemArea>
    </Layout>
  );
};

const mapPollsStateToProps = createStructuredSelector({
  venues: selectPolls,
  inDemo: selectInDemo,
  venue: selectSelectedPoll,
  challengeForm: selectInsiderChallengeForm,
});

export const PollList = connect(mapPollsStateToProps)(SearchPage);
