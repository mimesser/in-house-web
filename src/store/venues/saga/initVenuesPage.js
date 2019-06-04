import { put, call, select } from 'redux-saga/effects';
import Router from 'next/router';

import { waitTillReady } from '../../aggregate/saga';
import api from '../../../api';
import { loadVenuesDataSuccess, setSelectedVenue } from '../actions';
import { selectVenues } from '../selectors';

function* fetchVenueList() {
   const venues = yield select(selectVenues);
   if (venues) {
      return venues;
   }

   yield waitTillReady();
   const { data } = yield call(api.get, 'venues');
   yield put(loadVenuesDataSuccess(data));
   return data;
}

export function* initVenuesPage({ payload: { idToSelect } }) {
   const venues = yield fetchVenueList();
   if (!idToSelect) {
      return;
   }
   const id = +idToSelect;
   const venueToSelect = venues.find(v => v.id === id);
   if (venueToSelect) {
      yield put(setSelectedVenue(venueToSelect));
   } else {
      Router.push('/houses', '/houses', { shallow: true });
   }
}
