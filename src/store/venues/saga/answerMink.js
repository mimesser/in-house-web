import { put, select, call } from 'redux-saga/effects';

import { selectSelectedVenue } from '../selectors';
import api, { isConflict } from '../../../api';
import { setMinkAnswerStatus } from '../actions';
import { getRecord, clearRecord, setRecord } from './minkAnswerRecord';

const MAX_ATTEMPTS = 5;

export function* answerMink({ payload: { answer } }) {
   if (!answer) {
      return;
   }

   const record = getRecord();

   const venue = yield select(selectSelectedVenue);

   try {
      const {
         data: { isAnswerCorrect },
      } = yield call(api.post, `venues/${venue.id}/mink/${venue.topMink.id}/answer`, { answer });

      if (isAnswerCorrect) {
         clearRecord();
         yield put(setMinkAnswerStatus({ isAnswerCorrect }));
         return;
      }

      record.attempt += 1;
      if (record.attempt >= MAX_ATTEMPTS) {
         record.blocked = true;
         yield call(api.post, `venues/${venue.id}/mink/${venue.topMink.id}/block`);
      }
      setRecord(record);
      yield put(setMinkAnswerStatus({ isAnswerCorrect, blocked: record.blocked }));
   } catch (e) {
      if (!isConflict(e)) {
         throw e;
      }
      const record = { blocked: true, time: Date.now() };
      setRecord(record);
      yield put(setMinkAnswerStatus(record));
   }
}
