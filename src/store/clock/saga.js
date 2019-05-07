import { all, call, delay, put, take } from 'redux-saga/effects';

import { actionTypes, tickClock } from '../actions';

function* runClockSaga() {
   yield take(actionTypes.START_CLOCK);
   while (true) {
      yield put(tickClock(false));
      yield delay(1000);
   }
}

export default function* clockSaga() {
   yield all([call(runClockSaga)]);
}
