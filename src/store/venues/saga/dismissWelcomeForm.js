import { select, put } from 'redux-saga/effects';
import Router from 'next/router';

import { selectSelectedVenue } from '../selectors';
import { localStorageAccessor } from '../../../utils/storage';
import { selectAggregate } from '../../aggregate';

export function* dismissWelcomeForm() {
  const { userId } = yield select(selectAggregate);
  const { id } = yield select(selectSelectedVenue);
  const storageKey = `user/${userId}/${id}/skipWelcomeCount`;
  const count = localStorageAccessor.get(storageKey, 0);

  try {
    localStorageAccessor.set(storageKey, count + 1);
  } catch (e) {
    console.log(`@ Error on request: ${restCallUrl} -> ${e}`);
  }
}
