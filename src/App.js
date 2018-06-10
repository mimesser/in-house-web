import React, { Component } from 'react';
import { setData } from 'store';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { API_URL } from 'config';

import Beta from './pages/Beta';

class App extends Component {
   async componentDidMount() {
      if (this.props.venues) {
         const { data } = await axios.get(`${API_URL}/aggregate`);
         this.props.setData(data);
      }
   }

   render() {
      return (
         <Router>
            <Route
               path="/"
               component={Beta}
            />
         </Router>
      );
   }
}

function mapStateToProps({ venues }) {
   return {
      venues,
   };
}

export default connect(mapStateToProps, { setData })(App);
