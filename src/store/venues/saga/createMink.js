import { call, put } from 'redux-saga/effects';
import Router from 'next/router';

import api from '../../../api';
import { setAddedMinkId } from '../actions';
import { reloadVenueMinks } from './loadVenueMinks';
import { reloadInsiderVenueIds } from './reloadInsiderVenueIds';

export function* createMink({ payload: { id, question, answer } }) {
  const { data: created } = yield call(api.post, `/venues/${id}/mink`, { question, answer });

  // order and top mink can change
  const minks = yield reloadVenueMinks(id);
  const becameTop = created.id === minks[0].id;
  if (becameTop) {
    yield reloadInsiderVenueIds();
  } else {
    yield put(setAddedMinkId(created.id));
  }

  Router.push(`/houses?id=${id}&tab=mink`, `/houses/${id}/mink`, { shallow: true });
}
