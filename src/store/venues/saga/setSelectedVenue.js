import { put, select, delay, call } from 'redux-saga/effects';
import Router from 'next/router';
import isFinite from 'lodash/isFinite';

import {
   setChallengeFormData,
   setSelectedMink,
   setSelectedPost,
   setSelectedTag,
   setVenuePosts,
   setVenueRates,
} from '../actions';
import { selectIsActiveInsider } from '../selectors';
import { showInsiderChallenge } from './showInsiderChallenge';
import { VENUE_TABS } from '../../../../server/venueTabs';
import api from '../../../api';
import { selectAcceptedTerms } from '../../aggregate';

import { turnDemoOn, turnDemoOff } from '../../demo';
import { DEMO_VENUE_ID } from '../../demo/data';

const DELAY_BEFORE_CHALLENGE = 500;
const DELAY_CONFIRMATION = 1000;

const tabMap = {
   [VENUE_TABS.rate]: [setSelectedTag, 'ratetags', setVenueRates],
   [VENUE_TABS.post]: [setSelectedPost, 'feedback', setVenuePosts],
   [VENUE_TABS.mink]: [setSelectedMink],
};

function* showInsiderConfirmation() {
   yield put(setChallengeFormData({ isAnswerCorrect: true }));
   yield delay(DELAY_CONFIRMATION);
   const acceptedTerms = yield select(selectAcceptedTerms);
   yield put(setChallengeFormData(acceptedTerms ? undefined : { showTerms: true }));
}

const parseOpenItemRequest = venueId => {
   const { itemId, tab, token } = Router.query;
   const parsedItemId = +itemId;
   if (itemId) {
      Router.replace(`/houses?id=${venueId}&tab=${tab}`, `/houses/${venueId}/${tab}`, { shallow: true });
   }
   if (!isFinite(parsedItemId)) {
      return undefined;
   }
   const [setSelectedItem, urlPart, setList] = tabMap[tab];
   if (!setSelectedItem) {
      return undefined;
   }

   return {
      id: parsedItemId,
      setSelectedItem,
      setList,
      url: urlPart && `/venues/${venueId}/${urlPart}/${parsedItemId}?token=${token}`,
   };
};

export function* setSelectedVenue({ payload: { venue: { id } = {} } }) {
   if (!id) {
      return;
   }

   if (id === DEMO_VENUE_ID) {
      yield put(turnDemoOn());
   } else {
      // TODO: this should only get called once iff demo exit
      yield put(turnDemoOff());
   }

   const isActiveInsider = yield select(selectIsActiveInsider);

   const openItemData = parseOpenItemRequest(id);
   if (openItemData) {
      yield put(openItemData.setSelectedItem(openItemData.id));
   } else {
      yield delay(DELAY_BEFORE_CHALLENGE);
   }

   if (isActiveInsider) {
      yield showInsiderConfirmation();
      return;
   }
   if (openItemData) {
      if (!openItemData.url) {
         return;
      }

      try {
         const { data } = yield call(api.get, openItemData.url);
         yield put(openItemData.setList([data]));
         return;
      } catch (e) {
         // TODO: log error?
         // Nothing to do here - item not exists or token was already used
      }
   }

   yield showInsiderChallenge(id);
}
