import { all, put, takeLatest } from 'redux-saga/effects';

import api from '../../api';
import { actionTypes, failure, loadVenuesDataSuccess } from '../actions';
import { waitTillReady } from '../aggregate/saga';

function* loadVenuesDataSaga() {
   // TODO loader/spinner ?
   try {
      yield waitTillReady();
      const { data } = yield api.get('venues');
      yield put(loadVenuesDataSuccess(data));
   } catch (err) {
      yield put(failure(err));
   }
}

export default function* venuesSaga() {
   yield all([takeLatest(actionTypes.LOAD_VENUES_DATA, loadVenuesDataSaga)]);
}
