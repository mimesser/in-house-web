import { actionTypes } from './actions';
import { actionTypes as aggregateActions } from '../aggregate';

// listing props just for documentation
const initialState = {
  list: undefined,
  selectedVenue: undefined,
  insiderChallengeForm: undefined,
};

const setSelectedVenueProp = (state, action, key) => {
  if (!state.selectedVenue) {
    return state;
  }
  const {
    payload: { [key]: value },
  } = action;

  const selectedVenue = { ...state.selectedVenue, [key]: value };
  return { ...state, selectedVenue };
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CLEAR_VENUES_DATA:
      return {};
    case actionTypes.LOAD_VENUES_DATA_SUCCESS:
      return { ...state, list: action.data };
    case actionTypes.SET_SELECTED_VENUE: {
      const {
        payload: { venue: selectedVenue },
      } = action;
      return { ...state, selectedVenue, insiderChallengeForm: undefined };
    }
    case actionTypes.SET_CHALLENGE_FORM_DATA: {
      const { payload } = action;
      return { ...state, insiderChallengeForm: payload };
    }
    case actionTypes.SET_VENUE_TOP_MINK: {
      return setSelectedVenueProp(state, action, 'topMink');
    }
    case actionTypes.SET_VENUE_RATES: {
      return setSelectedVenueProp(state, action, 'rates');
    }
    case actionTypes.SET_VENUE_MINKS: {
      return setSelectedVenueProp(state, action, 'minks');
    }
    case actionTypes.SET_SELECTED_MINK: {
      return setSelectedVenueProp(state, action, 'selectedMinkId');
    }
    case actionTypes.SET_SELECTED_TAG: {
      return setSelectedVenueProp(state, action, 'selectedTagId');
    }
    case actionTypes.SHOW_VOTE_MINK_CONFIRMATION: {
      return setSelectedVenueProp(state, action, 'voteMinkConfirmation');
    }
    case actionTypes.SET_ANSWER_MINK_STATUS: {
      return setSelectedVenueProp(state, action, 'answerMinkStatus');
    }
    case actionTypes.SET_MY_CORRECT_ANSWER: {
      if (!state.selectedVenue || !state.selectedVenue.minks) {
        return state;
      }
      const {
        payload: { minkId, answer },
      } = action;
      const minks = state.selectedVenue.minks.slice();
      const index = minks.findIndex(m => m.id === minkId);
      minks[index] = { ...minks[index], myCorrectAnswer: answer };

      return { ...state, selectedVenue: { ...state.selectedVenue, minks } };
    }
    case aggregateActions.CLEAR_INSIDER_VENUE: {
      if (!state.selectedVenue) {
        return state;
      }
      const {
        payload: { id },
      } = action;

      const selectedVenue = state.list && state.list.find(v => v.id === id);
      return { ...state, selectedVenue };
    }
    case actionTypes.SHOW_RATE_TAG_CONFIRMATION: {
      return setSelectedVenueProp(state, action, 'rateTagConfirmation');
    }
    case actionTypes.UPDATE_VENUE_RATE: {
      const {
        payload: { venue },
      } = action;

      // TODO: consider storing items as map for easier updates

      const list = state.list.slice();
      const index = list.findIndex(v => v.id === venue.id);
      list[index] = venue;

      const selectedVenue = state.selectedVenue && {
        ...state.selectedVenue,
        votesCount: venue.votesCount,
        rating: venue.rating,
      };

      return { ...state, list, selectedVenue };
    }
    case actionTypes.SET_VENUE_POSTS: {
      return setSelectedVenueProp(state, action, 'posts');
    }
    case actionTypes.SET_SELECTED_POST: {
      return setSelectedVenueProp(state, action, 'selectedPostId');
    }
    case actionTypes.SHOW_VOTE_POST_CONFIRMATION: {
      return setSelectedVenueProp(state, action, 'votePostConfirmation');
    }
    case actionTypes.SET_PRIVATE_SHARE_ITEM_ID: {
      const newState = setSelectedVenueProp(state, action, 'privateShareItemId');
      if (newState.selectedVenue) {
        delete newState.selectedVenue.privateShareRecipientError;
        delete newState.selectedVenue.privateShareSending;
      }
      return newState;
    }
    case actionTypes.SET_PRIVATE_SHARE_RECIPIENT_ERROR: {
      return setSelectedVenueProp(state, action, 'privateShareRecipientError');
    }
    case actionTypes.SET_PRIVATE_SHARE_SENDING: {
      return setSelectedVenueProp(state, action, 'privateShareSending');
    }
    case actionTypes.SET_ADDED_MINK_ID: {
      return setSelectedVenueProp(state, action, 'addedMinkId');
    }
    case actionTypes.SET_NEW_MINK_ELECTED: {
      return setSelectedVenueProp(state, action, 'newMinkElected');
    }

    default:
      return state;
  }
}
