import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'next/router';

import { Page } from '../components/templates';
import { Container } from '../components/atoms';
import { Venue, VenueList } from '../components/organisms';
import { initVenuesPage, selectLoadingVenues } from '../store/venues';

class Houses extends Component {
   get houseId() {
      return this.props.router.query.id;
   }

   componentDidMount() {
      this.props.initVenuesPage(this.houseId);
   }

   componentDidUpdate(prevProps) {
      if (this.houseId !== prevProps.router.query.id) {
         this.props.initVenuesPage(this.houseId);
      }
   }

   render() {
      // TODO split and render separately?
      const View = this.houseId ? Venue : VenueList;

      return (
         <Page title="Houses" defaultHeader={!this.houseId}>
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
};

export default withRouter(
   connect(
      mapStateToProps,
      mapDispatch,
   )(Houses),
);
