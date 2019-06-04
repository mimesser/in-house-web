import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'next/router';

import { Page } from '../components/templates';
import { Container, Loader } from '../components/atoms';
import { VenueList, Venue } from '../components/organisms';
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

   renderComponent = () => {
      if (this.props.loading) {
         return <Loader big />;
      }

      return this.houseId ? <Venue id={this.houseId} /> : <VenueList />;
   };

   render() {
      return (
         <Page title="Houses">
            <Container>{this.renderComponent()}</Container>
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
