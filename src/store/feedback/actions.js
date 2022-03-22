export const actionTypes = {
  POST_FEEDBACK: 'POST_FEEDBACK',
  SET_FEEDBACK_ERROR: 'SET_FEEDBACK_ERROR',
  SET_FEEDBACK_LOADING: 'SET_FEEDBACK_LOADING',
  SET_FEEDBACK_SUCCESS: 'SET_FEEDBACK_SUCCESS',
  CLEAR_FEEDBACK: 'CLEAR_FEEDBACK',
  POST_JOIN_US: 'POST_JOIN_US'
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
