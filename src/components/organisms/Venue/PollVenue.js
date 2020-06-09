import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'next/router';

import InsiderQuestionChallenge from '../InsiderChallenge';
import { selectInsiderChallengeForm, selectSelectedVenue } from '../../../store/venues';
import { Loader, Icon } from '../../atoms';
import Banner from './Banner';
import Navbar from './Navbar';
import RateTab from './RateTab';
import PostTab from './PostTab';
import MinkTab from './MinkTab';
import AddMink from './AddMink';
import AddPost from './AddPost';

const tabMap = {
  poll: RateTab,
  post: PostTab,
};

const tabs = [
  {
    path: 'poll',
    label: 'poll',
    secured: true,
  },
  {
    path: 'post',
    label: 'post',
    secured: true,
  },
];

const knownTabs = Object.keys(tabMap);
const SocialLink = ({ href, icon }) => (
  <span>
    <a href={href} rel="noopener noreferrer" target="_blank">
      <Icon icon={icon} size={1.5} />
    </a>
  </span>
);
const PollVenue = ({ venue, router, challengeForm: challengeFormOpen }) => {
  const venueType = venue && venue.isPoll ? 'polls' : 'houses';
  const {
    query: { tab = 'poll' },
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

  const socialLinks = [
    {
      icon: 'facebook',
      href: 'https://www.facebook.com/iH.movement/',
    },
    {
      icon: 'twitter',
      href: 'https://twitter.com/iH_movement',
    },
    {
      icon: 'linkedin',
      href: 'https://www.linkedin.com/company/in-house6',
    },
  ];

  const shareLinks = (
    <div>
      {socialLinks.map((link) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <SocialLink {...link} key={link.icon} />
      ))}
    </div>
  );
  return (
    <>
      <>
        <Banner venue={venue} venueType={venueType} shareLinks={shareLinks} />
        <Navbar id={venue.id} selected={tab} venueType={venueType} tabs={tabs} />
        <Tab venue={venue} venueType={venueType} />
      </>
      <InsiderQuestionChallenge />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  venue: selectSelectedVenue,
  challengeForm: selectInsiderChallengeForm,
});

export default withRouter(connect(mapStateToProps)(PollVenue));
