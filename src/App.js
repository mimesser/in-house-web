import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { setData } from 'store';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { isEmpty } from 'ramda';
import { API_URL } from 'config';

import Beta from './pages/Beta';
import Venues from './pages/Venues';

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
      return (
         <Router>
            <div>
               <Route path="/" component={Beta} />
               <Route path="/venues" component={Venues} />
            </div>
         </Router>
      );
   }
}

function mapStateToProps(store) {
   return {
      initialized: !isEmpty(store),
   };
}

export default connect(mapStateToProps, { setData })(App);
