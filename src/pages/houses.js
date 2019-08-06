import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'next/router';

import { Page } from '../components/templates';
import { Container } from '../components/atoms';
import { Venue, VenueList } from '../components/organisms';
import { initVenuesPage, selectLoadingVenues } from '../store/venues';
import { turnDemoOn, turnDemoOff } from '../store/demo/actions';
import { VENUE_ID as DEMO_VENUE_ID } from '../store/demo/data';

class Houses extends Component {
   get houseId() {
      return this.props.router.query.id;
   }

   get isDemoPath() {
      return this.houseId === DEMO_VENUE_ID.toString();
   }

   get isNewMinkOrPostPath() {
      const { asPath } = this.props.router;
      return asPath.endsWith('mink/new') || asPath.endsWith('post/new');
   }

   handleBeforeUnload = e => {
      e.preventDefault();
      this.props.turnDemoOff();
   };

   componentDidMount() {
      if (this.isDemoPath) {
         window.addEventListener('beforeunload', this.handleBeforeUnload);
         this.props.turnDemoOn();
      }
      this.props.initVenuesPage(this.houseId);
   }

   componentDidUpdate(prevProps) {
      if (this.houseId !== prevProps.router.query.id) {
         this.props.initVenuesPage(this.houseId);
      }
   }

   componentWillUnmount() {
      if (this.isDemoPath) {
         window.removeEventListener('beforeunload', this.handleBeforeUnload);
         this.props.turnDemoOff();
      }
   }

   render() {
      // TODO split and render separately?
      const View = this.houseId ? Venue : VenueList;
      const defaultHeader = !this.houseId || this.isNewMinkOrPostPath;

      return (
         <Page title="Houses" defaultHeader={defaultHeader}>
            <Container fullVertical={this.houseId}>
               <View />
            </Container>
         </Page>
      );
   }
}

const mapStateToProps = createStructuredSelector({
   loading: selectLoadingVenues,
});

const mapDispatch = {
   initVenuesPage,
   turnDemoOn,
   turnDemoOff,
};

export default withRouter(
   connect(
      mapStateToProps,
      mapDispatch,
   )(Houses),
);
