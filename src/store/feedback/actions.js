export const actionTypes = {
  POST_FEEDBACK: 'POST_FEEDBACK',
  SET_FEEDBACK_ERROR: 'SET_FEEDBACK_ERROR',
  SET_FEEDBACK_LOADING: 'SET_FEEDBACK_LOADING',
  SET_FEEDBACK_SUCCESS: 'SET_FEEDBACK_SUCCESS',
  CLEAR_FEEDBACK: 'CLEAR_FEEDBACK',
  POST_JOIN_US: 'POST_JOIN_US',
  LOAD_INTERESTS: 'LOAD_INTERESTS',
  LOAD_INTERESTS_LOADING: 'LOAD_INTERESTS_LOADING',
  LOAD_SOURCES: 'LOAD_SOURCES',
  LOAD_SOURCES_LOADING: 'LOAD_SOURCES_LOADING',
  SET_INTERESTS: 'SET_INTERESTS',
  SET_SOURCES: 'SET_SOURCES',
};

export const postFeedback = (payload) => ({
  type: actionTypes.POST_FEEDBACK,
  payload,
});

export const setFeedbackError = (error) => ({
  type: actionTypes.SET_FEEDBACK_ERROR,
  payload: { error },
});

export const setFeedbackSuccess = () => ({
  type: actionTypes.SET_FEEDBACK_SUCCESS,
});

export const setFeedbackLoading = () => ({
  type: actionTypes.SET_FEEDBACK_LOADING,
});

export const clearFeedback = () => ({
  type: actionTypes.CLEAR_FEEDBACK,
});

export const postJoinUs = (payload) => ({
  type: actionTypes.POST_JOIN_US,
  payload,
});

export const loadInterests = () => ({
  type: actionTypes.LOAD_INTERESTS,
});

export const setInterests = (payload) => ({
  type: actionTypes.SET_INTERESTS,
  payload,
});

export const setInterestsLoading = (loading) => ({
  type: actionTypes.LOAD_INTERESTS_LOADING,
  payload: { loading },
});

export const loadSources = () => ({
  type: actionTypes.LOAD_SOURCES,
});

export const setSources = (payload) => ({
  type: actionTypes.SET_SOURCES,
  payload,
});

export const setSourcesLoading = (loading) => ({
  type: actionTypes.LOAD_SOURCES_LOADING,
  payload: { loading },
});
