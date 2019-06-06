import { call, put } from 'redux-saga/effects';

import api from '../../../api';
import { setSelectedVenueRates } from '../actions';

export function* loadVenueRateTags(id) {
   const { data } = yield call(api.get, `/Venues/${id}/rateTags`);
   yield put(setSelectedVenueRates(data));
}
