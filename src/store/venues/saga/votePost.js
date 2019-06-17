import { call, select, put, delay, fork } from 'redux-saga/effects';

import api from '../../../api';
import { selectSelectedPost, selectSelectedVenue } from '../selectors';
import { showVotePostConfirmation, setSelectedPost } from '../actions';
import { reloadVenuePosts } from './loadVenuePosts';

const CONFIRMATION_INTERVAL = 1500;

export function* votePost({ payload: { vote } }) {
   const venue = yield select(selectSelectedVenue);
   const post = yield select(selectSelectedPost);

   const { data } = yield call(api.post, `venues/${venue.id}/feedback/${post.id}/vote`, { vote });

   try {
      yield put(showVotePostConfirmation(data));
      // order can change
      yield fork(reloadVenuePosts, venue.id);
      yield delay(CONFIRMATION_INTERVAL);
   } finally {
      yield put(setSelectedPost(undefined));
      yield put(showVotePostConfirmation(undefined));
   }
}
