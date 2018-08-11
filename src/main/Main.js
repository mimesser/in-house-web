import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Router } from 'react-router-dom';

import styled from 'styled-components';

import Landing from 'pages/Landing';
import SearchResults from 'pages/SearchResults';
import VenuePage from 'pages/VenuePage';
import KitchenSink from 'pages/KitchenSink';
import ListVenue from 'pages/ListVenue';
import SuggestEdit from 'pages/SuggestEdit';
import ApplyAsOwner from 'pages/ApplyAsOwner';
import RequestNewIndustry from 'pages/RequestNewIndustry';
import Profile from 'pages/Profile';
import EditEmail from 'pages/EditEmail';
import EditPassword from 'pages/EditPassword';
import Header from './Header';
import { get } from '../services/aggregate';
import history from '../history';

const Wrapper = styled.div`
   background-color: ${props => props.theme.A_7};
   overflow: auto;
   position: fixed;
   top: 0;
   right: 0;
   left: 0;
   bottom: 0;
`;

const Content = styled.main`
   padding-top: 60px;
`;


class App extends Component {
   static propTypes = {
      booting: PropTypes.bool,
      noLocalStorage: PropTypes.bool,
      lastVenueId: PropTypes.string,
   }

   async componentDidMount() {
      if (!this.props.noLocalStorage) {
         get();
      }
   }

   componentWillReceiveProps = async ({ booting, lastVenueId }) => {
      if (this.props.booting && !booting && lastVenueId) {
         history.push(`/venues/${lastVenueId}`);
      }
   }

   renderSignup = () => {
      // TODO
      // eslint-disable-next-line no-console
      console.log('no local storage');
      return null;
   }

   render() {
      const { booting, noLocalStorage } = this.props;

      if (booting) {
         return null;
      }

      if (noLocalStorage) {
         return this.renderSignup();
      }

      return (
         <Router history={history}>
            <Wrapper>
               <Header />
               <Content>
                  <Route path="/" exact component={Landing} />
                  <Route path="/kitchen-sink" exact component={KitchenSink} />
                  <Route path="/venues" exact component={SearchResults} />
                  <Route path="/venues/:id" exact component={VenuePage} />
                  <Route path="/venues/:id/suggest-edit" component={SuggestEdit} />
                  <Route path="/venues/:id/apply-as-owner" component={ApplyAsOwner} />
                  <Route path="/list-venue" component={ListVenue} />
                  <Route path="/request-new-industry" component={RequestNewIndustry} />
                  <Route path="/profile" exact component={Profile} />
                  <Route path="/profile/email" exact component={EditEmail} />
                  <Route path="/profile/password" exact component={EditPassword} />
               </Content>
            </Wrapper>
         </Router>
      );
   }
}

function mapStateToProps({ booting, user, noLocalStorage }) {
   return {
      booting,
      lastVenueId: user && user.lastVenueId,
      noLocalStorage,
   };
}

export default connect(mapStateToProps)(App);
