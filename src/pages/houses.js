import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'next/router';

import { Venue, VenueList, Page } from '../components/organisms';
import { initVenuesPage, selectLoadingVenues, selectSelectedVenue } from '../store/venues';
import { DEMO_VENUES_ID } from '../store/demo/data';

class Houses extends Component {
  get houseId() {
    return this.props.router.query.id;
  }

  get inDemoVenues() {
    return this.houseId === DEMO_VENUES_ID;
  }

  get isNewMinkOrPostPath() {
    const { asPath } = this.props.router;
    return asPath.endsWith('mink/new') || asPath.endsWith('post/new');
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
    const View = this.houseId && !this.inDemoVenues ? Venue : VenueList;
    const defaultHeader = !this.houseId || this.isNewMinkOrPostPath || this.inDemoVenues;
    const title = this.props.selectedVenue
      ? `In-House - ${this.props.selectedVenue.name} | Speak as a Team | Remain Untraceable`
      : undefined;

    return (
      <Page title={title} defaultHeader={defaultHeader}>
        <View />
      </Page>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoadingVenues,
  selectedVenue: selectSelectedVenue,
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
