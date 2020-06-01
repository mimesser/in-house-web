import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'next/router';

import { Venue, VenueList, Page } from '../components/organisms';

import { Loader } from '../components/atoms';
import { initVenuesPage, selectLoadingVenues, selectSelectedVenue } from '../store/venues';
import { DEMO_VENUES_ID } from '../store/demo/data';
import BetaChallange from '../components/organisms/BetaChallange';
import { selectAuthorizedBetaUser, loadAggregateData } from '../store/aggregate';
import { END } from 'redux-saga';

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

  static async getInitialProps({ store }) {
    if (!store.getState().isAuthorizedBetaUser) {
      store.dispatch(loadAggregateData());
    }
    // await store.sagaTask.toPromise();
  }

  componentDidMount() {
    this.props.loadAggregateData();
    this.props.initVenuesPage(this.houseId);
  }

  componentDidUpdate(prevProps) {
    if (this.houseId !== prevProps.router.query.id) {
      this.props.initVenuesPage(this.houseId);
    }
  }

  onClose = () => {
    this.props.router.push('/');
  };

  render() {
    // TODO split and render separately?
    let View = this.houseId && !this.inDemoVenues ? Venue : VenueList;
    if (!this.props.isAuthorizedBetaUser) {
      View = () => <BetaChallange showPopup onClose={this.onClose} />;
    }
    const defaultHeader = !this.houseId || this.isNewMinkOrPostPath || this.inDemoVenues;
    const title = this.props.selectedVenue
      ? `In-House - ${this.props.selectedVenue.name} | Speak as a Team | Remain Untraceable`
      : undefined;

    if (this.props.loading) {
      View = () => <Loader big />;
    }
    return (
      <Page title={title} defaultHeader={defaultHeader} noPadd>
        <View />
      </Page>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoadingVenues,
  selectedVenue: selectSelectedVenue,
  isAuthorizedBetaUser: selectAuthorizedBetaUser,
});

const mapDispatch = {
  initVenuesPage,
  loadAggregateData,
};

export default withRouter(connect(mapStateToProps, mapDispatch)(Houses));
