import { put, call } from 'redux-saga/effects';

import api from '../../../api';
import { setMinkAnswerStatus, setSelectedVenueMink } from '../actions';
import { getRecord } from './minkAnswerRecord';

export function* setSelectedVenue({ payload: { venue: { id } = {} } }) {
   if (!id) {
      return;
   }
   const { blocked } = getRecord();
   yield put(setMinkAnswerStatus({ blocked }));

   const { data } = yield call(api.get, `venues/${id}/topmink`);
   yield put(setSelectedVenueMink(data));
}
