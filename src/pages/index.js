import { Fragment, Component } from 'react';
import axios from 'axios';

import { IconInput } from '../components/molecules';
import api from '../api';
import VenueList from '../components/venue-list';

export default class Home extends Component {
   state = {
      search: '',
      venues: [],
      loading: false,
      cancelSource: null, // Used with axios to cancel previous request.
   };

   setSearch = search => {
      this.setState({ loading: true, search });
      this.getVenues(search);
   };

   cancelSearchFunc = () => {
      const { cancelSource } = this.state;
      if (cancelSource) {
         cancelSource.cancel('Start new search, stop active search');
      }
   };

   getVenues = async search => {
      this.cancelSearchFunc();
      const source = axios.CancelToken.source();
      this.setState({ cancelSource: source });
      try {
         const { data: venues } = await api.get('/venues', { params: { IdentifierFreeText: search }, cancelToken: source.token });
         this.setState({ cancelSource: null, venues, loading: false });
      } catch (err) {
         // Probably cancelled.
         // TODO: Simply canceling axios requests is not good enough.
         // We need to debounce the requests.
      }
   };

   render() {
      const { search, loading, venues } = this.state;
      return (
         <Fragment>
            {!search && (
               <Fragment>
                  <h1>Let’s find your house</h1>
                  <p>You can find your workplace by looking up its name or address.</p>
               </Fragment>
            )}
            <IconInput type="search" icon="magnifying-glass" placeholder="Search for name or address" value={search} onChange={this.setSearch} />
            {(() => {
               if (!search) return null;
               if (loading) return <div className="loading">Loading...</div>;
               if (venues.length) return <VenueList venues={venues} />;
               return <p className="no-houses">No current houses match your search.</p>;
            })()}
            <style jsx>
               {`
                  .no-houses {
                     font-size: 24px;
                     line-height: 28px;
                     margin-top: 32px;
                  }
                  .loading {
                     margin-top: 24px;
                  }
                  @media screen and (max-width: 480px) {
                     p {
                        width: 267px;
                     }
                  }
               `}
            </style>
         </Fragment>
      );
   }
}
