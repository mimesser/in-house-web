export const actionTypes = {
  LOAD_AGGREGATE_DATA: 'LOAD_AGGREGATE_DATA',
  LOAD_AGGREGATE_DATA_SUCCESS: 'LOAD_AGGREGATE_DATA_SUCCESS',
  ADD_INSIDER_VENUE: 'ADD_INSIDER_VENUE',
  CLEAR_INSIDER_VENUE: 'CLEAR_INSIDER_VENUE',
  ACCEPT_TERMS: 'ACCEPT_TERMS',
  TERMS_ACCEPTED: 'TERMS_ACCEPTED',
  BETA_AUTHORIZE: 'BETA_AUTHORIZE',
  BETA_AUTHORIZE_SUCCESS: 'BETA_AUTHORIZE_SUCCESS',
  BETA_AUTHORIZE_REDIRECT: 'BETA_AUTHORIZE_REDIRECT',
  BETA_AUTHORIZE_FAILURE: 'BETA_AUTHORIZE_FAILURE',
};

export function loadAggregateData(isServer, pathname) {
  return { type: actionTypes.LOAD_AGGREGATE_DATA, meta: { isServer, pathname } };
}

export function loadAggregateDataSuccess(data) {
  return {
    type: actionTypes.LOAD_AGGREGATE_DATA_SUCCESS,
    data,
  };
}

export const addInsiderVenue = (id) => ({ type: actionTypes.ADD_INSIDER_VENUE, payload: { id } });
export const clearInsiderVenue = (id) => ({ type: actionTypes.CLEAR_INSIDER_VENUE, payload: { id } });
export const acceptTerms = () => ({ type: actionTypes.ACCEPT_TERMS });
export const termsAccepted = () => ({ type: actionTypes.TERMS_ACCEPTED });

export const checkBetaAuth = (password) => ({ type: actionTypes.BETA_AUTHORIZE, payload: { password } });
export const checkBetaAuthSuccess = () => ({ type: actionTypes.BETA_AUTHORIZE_SUCCESS });
export const performBetaAuthRedirect = () => ({ type: actionTypes.BETA_AUTHORIZE_REDIRECT });
export const checkBetaAuthFailure = (password) => ({ type: actionTypes.BETA_AUTHORIZE_FAILURE, payload: { password } });
