import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'next/router';

import InsiderQuestionChallenge from '../InsiderQuestionChallenge';
import { selectSelectedVenue } from '../../../store/venues';
import { Loader } from '../../atoms';
import { Banner } from './Banner';
import { Navbar } from './Navbar';
import { RateTab } from './RateTab';
import { PostTab } from './PostTab';
import MinkTab from './MinkTab';

const tabMap = {
   rate: RateTab,
   post: PostTab,
   mink: MinkTab,
};

const knownTabs = Object.keys(tabMap);

const Venue = ({ venue, router }) => {
   const {
      query: { tab = 'rate' },
   } = router;

   useEffect(() => {
      if (!knownTabs.includes(tab)) {
         router.replace('/houses');
      }
   }, []);

   if (!venue) {
      return <Loader big />;
   }

   const Tab = tabMap[tab] || RateTab;

   return (
      <>
         <Banner venue={venue} />
         <Navbar id={venue.id} selected={tab} />
         <Tab venue={venue} />
         <InsiderQuestionChallenge />
      </>
   );
};

const mapStateToProps = createStructuredSelector({
   venue: selectSelectedVenue,
});

const mapDispatch = {};

export default withRouter(
   connect(
      mapStateToProps,
      mapDispatch,
   )(Venue),
);
