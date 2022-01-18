import { select, put } from 'redux-saga/effects';
import Router from 'next/router';

import { selectSelectedVenue } from '../selectors';
import { setChallengeFormData } from '../actions';
import { selectInDemo } from '../../demo';
import { DEMO_VENUES_ID } from '../../demo/data';
import { formatMovementURL } from '../../../utils/format';

/**
 * @description
 * This Redux Saga function helps to dismiss the popup mink form modal that appears when you enter the venue first time.
 *
 * @param {boolean} showMinks is the boolean value.
 * @param {string} name is the name of the venue.
 * @param {boolean} lite is the boolean value of the venue.
 *
 * @returns Nothing
 */

export function* dismissChallengeForm({ payload: { showMinks, name, lite } }) {
  const { id } = yield select(selectSelectedVenue);
  const inDemo = yield select(selectInDemo);

  yield put(setChallengeFormData());

  if (showMinks) {
    Router.push(
      `/houses?id=${id}&tab=mink&time=${Date.now()}`,
      `/${lite ? 'movement' : 'houses'}/${lite ? formatMovementURL(name) : id}/mink`,
      { shallow: true },
    );
  } else {
    const redirectUrl = inDemo ? `/houses/${DEMO_VENUES_ID}` : '/houses';
    Router.push(redirectUrl, redirectUrl, { shallow: true });
  }
}
