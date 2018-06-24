import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { setData } from 'store';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import moment from 'moment';
import { API_URL } from 'config';
import styled from 'styled-components';
import Header from 'layout/Header';

import Beta from './pages/Beta';
import Venues from './pages/Venues';
import VenueItem from './pages/VenueItem';
import KitchenSink from './pages/KitchenSink';

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
      setData: PropTypes.func.isRequired,
   }

   async componentDidMount() {
      if (!this.props.initialized) {
         const { data } = await axios.get(`${API_URL}/aggregate`);
         this.props.setData(data);
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
                  <Route path="/" exact component={Beta} />
                  <Route path="/kitchen-sink" exact component={KitchenSink} />
                  <Route path="/venues" exact component={Venues} />
                  <Route path="/venues/:id" component={VenueItem} />
               </Content>
            </Wrapper>
         </Router>
      );
   }
}

function mapStateToProps(store) {
   return {
      initialized: store.timeStamp && moment(store.timeStamp).diff(moment()) > 0,
   };
}

export default connect(mapStateToProps, { setData })(App);
