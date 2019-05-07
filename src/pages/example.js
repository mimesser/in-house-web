import React, { Component } from 'react';
import { connect } from 'react-redux';

import { startClock, tickClock } from '../store/actions';
import Page from '../components/templates/page';

class Example extends Component {
   static async getInitialProps(props) {
      const { store, isServer } = props.ctx;
      store.dispatch(tickClock(isServer));
      return { isServer };
   }

   componentDidMount() {
      this.props.dispatch(startClock());
   }

   render() {
      return <Page title="Example Page" linkTo="/" NavigateTo="Index Page" />;
   }
}

export default connect()(Example);
