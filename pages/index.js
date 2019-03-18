import { Fragment, useState } from 'react';
import axios from 'axios';
import { Input } from '../components';
import { debounce } from '../utils';
import api from '../api';
import VenueList from '../components/venue-list';

function cancelSearchFunc(cancelSource) {
  if (cancelSource) {
    cancelSource.cancel('Start new search, stop active search');
    console.log('cancel request done');
  }
}

const getVenues = debounce(async (value, setVenues, setLoading, cancelSource, setCancelSource) => {
  cancelSearchFunc(cancelSource);
  const source = axios.CancelToken.source();
  setCancelSource(source);
  try {
    const { data: venues } = await api.get('/venues', { params: { IdentifierFreeText: value }, cancelToken: source.token });
    setCancelSource(null);
    setVenues(venues);
    setLoading(false);
  } catch (err) {
    // Probably cancelled.
  }
}, 0, { leading: true, trailing: true });



function Home({ mode }) {
  const [search, setSearch] = useState('');
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cancelSource, setCancelSource] = useState(null);

  function onSearchChange(value) {
    setLoading(true);
    getVenues(value, setVenues, setLoading, cancelSource, setCancelSource);
    setSearch(value);
  }


  return (
    <Fragment>
      {!search && (
        <Fragment>
          <h1>Let's find your house</h1>
          <p>You can find your workplace by looking up its name or address.</p>
        </Fragment>
      )}
      <Input type="search" placeholder="Search for name or address" value={search} onChange={onSearchChange} />
      {loading && <div>Loading...</div>}
      {!loading && <VenueList venues={venues} />}
      <style jsx>{`
        p {
          width: 267px;
        }
      `}</style>
    </Fragment>
  );
}

Home.getInitialProps = () => {
  // TODO: save in redux.
  if (process.browser) {
    return {};
  }
  return { mode: process.env.MODE };
};

export default Home;
