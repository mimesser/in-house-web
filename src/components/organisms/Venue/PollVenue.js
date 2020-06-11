import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'next/router';
import { StickyContainer, Sticky } from 'react-sticky';

import styled from 'styled-components';
import { palette, cover, spacing } from '../../../style';
import PollChallenge from '../InsiderChallenge/PollChallenge';
import { selectInsiderChallengeForm, selectSelectedVenue } from '../../../store/venues';
import { Loader, Icon } from '../../atoms';
import { WinkConfirmation } from '../../molecules';
import Banner from './Banner';
import Navbar from './Navbar';
import RateTab from './RateTab';
import PostTab from './PostTab';
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

export const Title = styled.div`
  padding: ${spacing.xl} ${spacing.xxl};
  text-transform: lower;
  color: ${palette.mediumGray};
`;

const InfoBanner = styled.div`
  background-color: ${palette.primary};
  margin-top: 20px;
  margin-bottom: 20px;
  padding: ${spacing.lg} ${spacing.xl};
  height: 50px;
  ${Title} {
    display: flex;
    align-items: center;
    color: ${palette.lightGray};
    padding: 0;
    float: left;
  }
  ${Icon} {
    background-color: ${palette.primary};
    color: ${palette.darkGray};
    margin-left: 15px;
  }
`;

const PollVenue = ({ venue, router, challengeForm: challengeFormOpen }) => {
  const venueType = venue && venue.isPoll ? 'polls' : 'houses';
  const {
    query: { tab = 'poll' },
    asPath,
  } = router;

  const banner =
    tab === 'poll' ? (
      <InfoBanner>
        {' '}
        <Title>tell us about your world</Title>
        <Icon icon="winky-circle" />
      </InfoBanner>
    ) : undefined;
  useEffect(() => {
    if (!knownTabs.includes(tab)) {
      router.replace(`/${venueType}`);
    }
  }, []);

  if (!venue) {
    return <Loader big />;
  }

  if (asPath.endsWith('post/new')) {
    return <AddPost venueType={venueType} />;
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
      <StickyContainer>
        <Banner venue={venue} venueType={venueType} shareLinks={shareLinks} />

        <Sticky disableCompensation>
          {({
            style,

            // the following are also available but unused in this example
            isSticky,
            wasSticky,
            distanceFromTop,
            distanceFromBottom,
            calculatedHeight,
          }) => (
            <div style={{ ...style, zIndex: 100 }}>
              <Navbar id={venue.id} selected={tab} venueType={venueType} tabs={tabs} />
            </div>
          )}
        </Sticky>
        {banner}
        <Tab venue={venue} venueType={venueType} />
      </StickyContainer>
      <PollChallenge />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  venue: selectSelectedVenue,
  challengeForm: selectInsiderChallengeForm,
});

export default withRouter(connect(mapStateToProps)(PollVenue));
