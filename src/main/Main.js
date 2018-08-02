import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import styled from 'styled-components';

import BetaCountdown from 'pages/0/BetaCountdown';
import SearchResults from 'pages/12/SearchResults';
import VenuePage from 'pages/13/VenuePage';
import KitchenSink from 'pages/KitchenSink';
import Header from './Header';
import { get } from '../services/aggregate';

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
      initialized: PropTypes.bool.isRequired,
   }

   async componentDidMount() {
      if (!this.props.initialized) {
         get();
      }
   }

   render() {
      if (!this.props.initialized) {
         return null;
      }

      return (
         <Router>
            <Wrapper>
               <Header />
               <Content>
                  <Route path="/" exact component={BetaCountdown} />
                  <Route path="/kitchen-sink" exact component={KitchenSink} />
                  <Route path="/venues" exact component={SearchResults} />
                  <Route path="/venues/:id" component={VenuePage} />
               </Content>
            </Wrapper>
         </Router>
      );
   }
}

function mapStateToProps() {
   return {
      initialized: false, // store.timeStamp ? moment(store.timeStamp).diff(moment()) > 0 : false,
   };
}

export default connect(mapStateToProps)(App);
