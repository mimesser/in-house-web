import { actionTypes } from './actions';

const initialState = { wrongAnswer: true };

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_AGGREGATE_DATA_SUCCESS:
      return { ...state, ...action.data };
    case actionTypes.BETA_AUTHORIZE_SUCCESS || action.BETA_AUTHORIZE_REDIRECT:
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
