import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setAuthorization } from '../api';
import { Page } from '../components/templates';
import { loadVenuesData } from '../store/actions';
import { aggregateUserIdSelector } from '../store/selectors';
import { Container } from '../components/atoms';
import { VenueList } from '../components/organisms';

class Home extends Component {
   static async getInitialProps(props) {
      const { store, isServer } = props.ctx;

      if (!store.getState().aggregate) {
         return 1;
      }
      setAuthorization(aggregateUserIdSelector(store.getState()));

      if (!store.getState().venues) {
         store.dispatch(loadVenuesData());
      }

      return { isServer };
   }

   render() {
      return (
         <Page title="Home Page">
            <Container>
               <VenueList />
            </Container>
         </Page>
      );
   }
}

export default connect()(Home);
