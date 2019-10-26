import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'next/router';

import { Page } from '../components/templates';
import { Venue, VenueList } from '../components/organisms';
import { initVenuesPage, selectLoadingVenues } from '../store/venues';
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

    return (
      <Page title="houses" defaultHeader={defaultHeader}>
        <View />
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
