import { call, put } from 'redux-saga/effects';
import Router from 'next/router';

import api from '../../../api';
import { setVenueMinks, storeNewMink } from '../actions';

export function* createMink({ payload: { id, question, answer } }) {
   const { data: created } = yield call(api.post, `/venues/${id}/mink`, { question, answer });
   const {
      data: { minks },
   } = yield call(api.get, `/venues/${id}/minks`);
   yield put(setVenueMinks(minks));

   const becameTop = created.id === minks[0].id;
   if (!becameTop) {
      yield put(storeNewMink(created));
   }

   Router.push(`/houses?id=${id}&tab=mink`, `/houses/${id}/mink`, { shallow: true });
}
