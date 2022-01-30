import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'next/router';

import InsiderQuestionChallenge from '../InsiderChallenge';
import WelcomePopup from './WelcomePopup';
import {
  selectInsiderChallengeForm,
  selectIsActiveInsider,
  selectSelectedVenue,
} from '../../../store/venues';
import { Loader } from '../../atoms';
// import Banner from './Banner';
import Navbar from './Navbar';
import RateTab from './RateTab';
import PostTab from './PostTab';
import MinkTab from './MinkTab';
import AddMink from './AddMink';
import AddPost from './AddPost';
import RateVenueLayout from '../../layouts/rateVenue.layout';

const tabMap = {
  rate: RateTab,
  post: PostTab,
  mink: MinkTab,
};

const Venue = ({ loading, venue, router, authorized, challengeFormData }) => {
  if (!venue) {
    return <Loader big />;
  }
  if (router.asPath.endsWith('mink/new') && venue && !venue.isPoll) {
    return <AddMink />;
  }
  if (router.asPath.endsWith('post/new')) {
    return <AddPost />;
  }

  const lite = venue.industry?.lite || false;
  const venueType = venue.isPoll ? 'polls' : 'houses';
  const { tab = lite ? 'post' : 'rate' } = router.query;
  const Tab = tabMap[tab] || (lite ? PostTab : RateTab);
  const showLoading = loading || (!authorized && tab !== 'mink');

  /*
   * TODO: README
   * Avoid props drilling, we have these values in store,
   * so use these values within the tab components to be built
   * */

  return (
    <>
      <>
        <RateVenueLayout tabs={{ rate: RateTab, post: PostTab, team: MinkTab }} />
        {/* <Banner venue={venue} /> */}
        <Navbar id={venue.id} name={venue.name} selected={tab} venueType={venueType} lite={lite} />
        <Tab loading={showLoading} venue={venue} venueType={venueType} />
      </>
      {!authorized && challengeFormData && <InsiderQuestionChallenge />}
      {venue && venue.showWelcome && <WelcomePopup />}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  venue: selectSelectedVenue,
  authorized: selectIsActiveInsider,
  challengeFormData: selectInsiderChallengeForm,
});

export default withRouter(connect(mapStateToProps)(Venue));
