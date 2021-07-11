import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'next/router';

import InsiderQuestionChallenge from '../InsiderChallenge';
import WelcomePopup from './WelcomePopup';
import { selectInsiderChallengeForm, selectSelectedVenue } from '../../../store/venues';
import { Loader } from '../../atoms';
import Banner from './Banner';
import Navbar from './Navbar';
import RateTab from './RateTab';
import PostTab from './PostTab';
import MinkTab from './MinkTab';
import AddMink from './AddMink';
import AddPost from './AddPost';

const tabMap = {
  rate: RateTab,
  post: PostTab,
  mink: MinkTab,
};

const knownTabs = Object.keys(tabMap);

const Venue = ({ venue, router, challengeForm: challengeFormOpen }) => {
  if (!venue) return null;
  
  const lite = venue.industry.lite;
  const venueType = venue && venue.isPoll ? 'polls' : 'houses';
  const {
    query: { tab = lite ? 'post' : 'rate' },
    asPath,
  } = router;

  useEffect(() => {
    if (!knownTabs.includes(tab)) {
      router.replace(`/${venueType}`);
    }
  }, []);

  if (!venue) {
    return <Loader big />;
  }

  if (asPath.endsWith('mink/new') && venue && !venue.isPoll) {
    return <AddMink />;
  }

  if (asPath.endsWith('post/new')) {
    return <AddPost />;
  }

  const Tab = tabMap[tab] || RateTab;
  return (
    <>
      <>
        <Banner venue={venue} />
        <Navbar id={venue.id} name={venue.name} selected={tab} venueType={venueType} lite={lite} />
        <Tab venue={venue} venueType={venueType} />
      </>
      <InsiderQuestionChallenge />
      {venue && venue.showWelcome && <WelcomePopup />}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  venue: selectSelectedVenue,
  challengeForm: selectInsiderChallengeForm,
});

export default withRouter(connect(mapStateToProps)(Venue));
