import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'next/router';

import { Venue, VenueList, Page } from '../components/organisms';
import { initVenuesPage, selectLoadingVenues, selectSelectedVenue } from '../store/venues';
import { DEMO_VENUES_ID } from '../store/demo/data';
import BetaChallange from '../components/organisms/BetaChallange';
import { selectAuthorizedBetaUser } from '../store/aggregate';

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

  onClose = () => {
    this.props.router.push('/houses');
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
};

export default withRouter(connect(mapStateToProps, mapDispatch)(Houses));
