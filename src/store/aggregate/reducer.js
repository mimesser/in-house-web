import { HYDRATE } from 'next-redux-wrapper';
import { actionTypes } from './actions';
/**
 * TODO: wrongAnswer should not be stored on the global aggregate object.
 * Added undefined state to show: true=failed, false=success, undefined=unknown/loading
 */
const initialState = { wrongAnswer: undefined };

export function reducer(state = initialState, action) {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case actionTypes.LOAD_AGGREGATE_DATA_SUCCESS:
      return { ...state, ...action.data };

    case actionTypes.BETA_AUTHORIZE:
      return {
        ...state,
        wrongAnswer: undefined,
      };

    case actionTypes.BETA_AUTHORIZE_SUCCESS:
      return {
        ...state,
        wrongAnswer: false,
      };

    case action.BETA_AUTHORIZE_REDIRECT:
      return {
        ...state,
        wrongAnswer: false,
        isAuthorizedBetaUser: true,
      };

    case actionTypes.BETA_AUTHORIZE_FAILURE:
      return {
        ...state,
        wrongAnswer: true,
        isAuthorizedBetaUser: false,
      };

    case actionTypes.ADD_INSIDER_VENUE: {
      const {
        payload: { id },
      } = action;
      return {
        ...state,
        insiderVenueIds: state.insiderVenueIds.concat(id),
      };
    }
    case actionTypes.CLEAR_INSIDER_VENUE: {
      const {
        payload: { id },
      } = action;
      return {
        ...state,
        insiderVenueIds: state.insiderVenueIds.filter((i) => i !== id),
      };
    }
    case actionTypes.TERMS_ACCEPTED: {
      return {
        ...state,
        isTermsAccepted: true,
      };
    }

    default:
      return state;
  }
}
