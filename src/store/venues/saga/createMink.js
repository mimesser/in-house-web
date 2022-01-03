import { call, put } from 'redux-saga/effects';
import Router from 'next/router';

import api from '../../../api';
import { setAddedMinkId } from '../actions';
import { reloadVenueMinks } from './loadVenueMinks';
import { reloadInsiderVenueIds } from './reloadInsiderVenueIds';
import { formatMovementURL } from '../../../utils/format';

/**
 * @description
 * This Redux Saga function helps to create new mink.
 * @param {string} id  is the id of Venue.
 * @param {string} name  is the name of Venue.
 * @param {string} question  is the question of  the new mink.
 * @param {string} answer  is the answer of  the new mink.
 * @param {boolean} lite  is the boolean value of Venue.
 *
 * @returns Nothing
 */

export function* createMink({ payload: { id, name, question, answer, lite } }) {
  const { data: created } = yield call(api.post, `/venues/${id}/mink`, { question, answer });

  // order and top mink can change
  const minks = yield reloadVenueMinks(id);
  const becameTop = created.id === minks[0].id;
  if (becameTop) {
    yield reloadInsiderVenueIds();
  } else {
    yield put(setAddedMinkId(created.id));
  }

  Router.push(
    `/${'houses'}?id=${id}&tab=mink&time=${Date.now()}`,
    `/${lite ? 'movement' : 'houses'}/${lite ? formatMovementURL(name) : id}/mink`,
    { shallow: true },
  );
}
