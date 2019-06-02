import { put, call } from 'redux-saga/effects';

import { waitTillReady } from '../../aggregate/saga';
import api from '../../../api';
import { loadVenuesDataSuccess } from '../actions';

export function* loadVenues() {
   yield waitTillReady();
   const { data } = yield call(api.get, 'venues');
   yield put(loadVenuesDataSuccess(data));
}
