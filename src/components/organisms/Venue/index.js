import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'next/router';

import InsiderQuestionChallenge from '../InsiderQuestionChallenge';
import { selectSelectedVenue } from '../../../store/venues';
import { selectIsDemoing } from '../../../store/demo';
import { Loader } from '../../atoms';
import { Banner } from './Banner';
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

const Venue = ({ venue, router, isDemoing }) => {
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
   const redirectPath = isDemoing ? '/how-it-works?step=4' : '/houses';

   return (
      <>
         <Banner venue={venue} redirectPath={redirectPath} />
         <Navbar id={venue.id} selected={tab} />
         <Tab venue={venue} />
         <InsiderQuestionChallenge />
      </>
   );
};

const mapStateToProps = createStructuredSelector({
   venue: selectSelectedVenue,
   isDemoing: selectIsDemoing,
});

const mapDispatch = {};

export default withRouter(
   connect(
      mapStateToProps,
      mapDispatch,
   )(Venue),
);
