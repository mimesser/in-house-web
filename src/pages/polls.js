import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'next/router';
import { Venue, Page } from '../components/organisms';
import PollVenue from '../components/organisms/Venue/PollVenue';
import { PollList } from '../components/organisms/VenueList/PollList';

import { Loader } from '../components/atoms';
import { initPollsPage, selectLoadingPolls, selectSelectedPoll } from '../store/venues';
import { selectAuthorizedBetaUser, loadAggregateData } from '../store/aggregate';

class Houses extends Component {
  get houseId() {
    return this.props.router.query.id;
  }

  static async getInitialProps({ store }) {
    if (!store.getState().isAuthorizedBetaUser) {
      store.dispatch(loadAggregateData());
    }
  }

  componentDidMount() {
    this.props.loadAggregateData();
    this.props.initPollsPage(this.houseId);
  }

  componentDidUpdate(prevProps) {
    if (this.houseId !== prevProps.router.query.id) {
      this.props.initPollsPage(this.houseId);
    }
    console.log(`@ componentDidUpdate: ${this.props.loading}`);
  }

  onClose = () => {
    this.props.router.push('/');
  };

  render() {
    // TODO split and render separately?
    let View = this.houseId ? PollVenue : PollList;

    const defaultHeader = !this.houseId || this.isNewMinkOrPostPath;
    const title = this.props.selectedPoll
      ? `In-House - ${this.props.selectedPoll.name} | Speak as a Team | Remain Untraceable`
      : undefined;

    if (this.props.loading) {
      View = () => <Loader big />;
    }

    console.log(`@ polls -> render loading: ${this.props.loading} view: ${this.houseId}`);
    return (
      <Page title={title} defaultHeader={defaultHeader} noPadd>
        <View />
      </Page>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoadingPolls,
  selectedPoll: selectSelectedPoll,
  isAuthorizedBetaUser: selectAuthorizedBetaUser,
});

const mapDispatch = {
  initPollsPage,
  loadAggregateData,
};

export default withRouter(connect(mapStateToProps, mapDispatch)(Houses));
