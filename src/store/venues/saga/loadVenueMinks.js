import { call, put, select } from 'redux-saga/effects';

import api from '../../../api';
import { setVenueMinks } from '../actions';
import { selectSelectedVenue } from '../selectors';

export function* loadVenueMinks() {
   const { id, minks: loaded } = yield select(selectSelectedVenue);
   if (loaded) {
      return;
   }
   // TODO: handle pagination, store total count
   const {
      data: { minks },
   } = yield call(api.get, `/Venues/${id}/minks`);
   yield put(setVenueMinks(minks));
}
