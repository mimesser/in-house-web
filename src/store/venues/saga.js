import { all, put, takeLatest } from 'redux-saga/effects';

import api from '../../api';
import { actionTypes, failure, loadVenuesDataSuccess } from '../actions';

function* loadVenuesDataSaga() {
   try {
      const res = yield api.get('venues', { method: 'GET' });
      const { data } = res;
      yield put(loadVenuesDataSuccess(data));
   } catch (err) {
      yield put(failure(err));
   }
}

export default function* venuesSaga() {
   yield all([takeLatest(actionTypes.LOAD_VENUES_DATA, loadVenuesDataSaga)]);
}
