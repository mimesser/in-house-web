import { actionTypes } from './actions';

const initialState = { interests: [], sources: [] };

const formatOptions = (list = []) => list.map((item) => ({ value: item.id, label: item.name }));

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_FEEDBACK_ERROR: {
      return { ...state, error: action.payload.error };
    }
    case actionTypes.SET_FEEDBACK_LOADING: {
      return { ...state, loading: true };
    }
    case actionTypes.SET_FEEDBACK_SUCCESS: {
      return { ...state, success: true };
    }
    case actionTypes.CLEAR_FEEDBACK: {
      return { ...state, error: undefined, loading: undefined, suceess: undefined };
    }
    case actionTypes.SET_INTERESTS: {
      return { ...state, interests: formatOptions(action.payload) };
    }
    case actionTypes.SET_SOURCES: {
      return { ...state, sources: formatOptions(action.payload) };
    }
    case actionTypes.LOAD_INTERESTS_LOADING: {
      return { ...state, interestsLoading: action.payload.loading };
    }
    case actionTypes.LOAD_SOURCES_LOADING: {
      return { ...state, sourcesLoading: action.payload.loading };
    }

    default:
      return state;
  }
}
