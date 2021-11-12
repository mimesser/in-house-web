import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'next/router';

import {
  loadRates,
  loadPosts,
  loadMinks,
  initVenuesPage,
  selectLoadingVenues,
  selectSelectedVenue,
} from '../store/venues';
import { selectAuthorizedBetaUser, loadAggregateData } from '../store/aggregate';
import { DEMO_VENUES_ID } from '../store/demo/data';

import { Loader } from '../components/atoms';
import { Venue, VenueList, Page } from '../components/organisms';

class Houses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initializing: true,
    };
  }

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
    const { initVenuesPage, router } = this.props;

    initVenuesPage(this.houseId);

    if (this.houseId) {
      switch (router.query?.tab) {
        case 'rate':
          loadRates();
          break;
        case 'post':
          loadPosts();
          break;
        case 'mink':
          loadMinks();
          break;
        default:
      }
    }

    this.setState({ initializing: false });
  }

  componentDidUpdate(prevProps) {
    const { router, initVenuesPage, loadRates, loadPosts, loadMinks } = this.props;

    if ((this.houseId && !prevProps.router.query?.id) || !this.houseId) {
      initVenuesPage(this.houseId);
    }
    if (
      this.houseId &&
      (prevProps.selectedVenue === undefined ||
      router.query.tab !== prevProps.router.query.tab )||
      ((typeof prevProps.router.query?.time !== 'undefined' &&
        router.query?.time !== prevProps.router.query?.time) ||
        !prevProps.router.query?.id) &&
      (router.asPath.endsWith('rate') ||
        router.asPath.endsWith('post') ||
        router.asPath.endsWith('mink'))
    ) {
      switch (router.query?.tab) {
        case 'rate':
          loadRates();
          break;
        case 'post':
          loadPosts();
          break;
        case 'mink':
          loadMinks();
          break;
        default:
      }
    }
  }

  onClose = () => {
    this.props.router.push('/');
  };

  render() {
    // @TODO split and render separately?
    let View = this.houseId && !this.inDemoVenues ? Venue : VenueList;
    // if (!this.props.isAuthorizedBetaUser) {
    //   View = () => <BetaChallange showPopup onClose={this.onClose} />;
    // }
    const defaultHeader = !this.houseId || this.inDemoVenues;
    const title = this.props.selectedVenue
      ? `In-House - ${this.props.selectedVenue.name} | Speak as a Team | Remain Untraceable`
      : undefined;

    if (this.state.initializing || this.props.loading) {
      View = () => <Loader big />;
    }

    return (
      <Page title={title} defaultHeader={defaultHeader} noPadd>
        <View loading={this.props.selectedVenue?.loading} />
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
  loadRates,
  loadPosts,
  loadMinks,
};

export default withRouter(connect(mapStateToProps, mapDispatch)(Houses));
