import { select, put } from 'redux-saga/effects';
import Router from 'next/router';

import { selectSelectedVenue } from '../selectors';
import { localStorageAccessor } from '../../../utils/storage';
import { selectAggregate } from '../../aggregate';

export function* dismissWelcomeForm({ payload: { skipWelcome } }) {
  const { userId } = yield select(selectAggregate);
  const storageKey = `user/${userId}/skipWelcome`;
  if (skipWelcome) {
    try {
      localStorageAccessor.set(storageKey, true);
    } catch (e) {
      console.log(`# Error on request: ${restCallUrl} -> ${e}`);
    }
  }
}
