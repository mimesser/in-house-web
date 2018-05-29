import React, { Component } from 'react';
import axios from 'axios';

import { API_URL } from 'config';
import './Venues.css';

export default class Venues extends Component {
   state = {
      venues: null,
   }

   async componentWillMount() {
      const { data: venues } = await axios.get(`${API_URL}/venues`);
      this.setState({ venues });
   }

   render() {
      const { venues } = this.state;

      return (
         <div className="Venues">
            <div className="header">
               <div className="header-logo" />
               <div className="header-text">nyc</div>
            </div>
            <h1 className="sub-header">
               anonymous ratings from insiders only
            </h1>
            {venues && (
               <select>
                  ${venues.map(venue => (
                     <option value={venue.Id} key={venue.Id}>
                        {venue.Name}
                     </option>
                  ))}
               </select>
            )}
         </div>
      );
   }
}
