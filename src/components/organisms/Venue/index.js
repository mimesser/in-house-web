import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'next/router';

import InsiderQuestionChallenge from '../InsiderChallenge';
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
  const {
    query: { tab = 'rate' },
    asPath,
  } = router;

  useEffect(() => {
    if (!knownTabs.includes(tab)) {
      router.replace('/houses');
    }
  }, []);

  if (!venue) {
    return <Loader big />;
  }

  if (asPath.endsWith('mink/new')) {
    return <AddMink />;
  }

  if (asPath.endsWith('post/new')) {
    return <AddPost />;
  }

  const Tab = tabMap[tab] || RateTab;

  return (
    <>
      {
        <>
          <Banner venue={venue} />
          <Navbar id={venue.id} selected={tab} />
          <Tab venue={venue} />
        </>
      }
      <InsiderQuestionChallenge />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  venue: selectSelectedVenue,
  challengeForm: selectInsiderChallengeForm,
});

export default withRouter(connect(mapStateToProps)(Venue));
