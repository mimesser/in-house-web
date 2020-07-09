export const actionTypes = {
  INIT_POLLS_PAGE: 'INIT_POLLS_PAGE',
  LOAD_POLLS_DATA_SUCCESS: 'LOAD_POLLS_DATA_SUCCESS',
  DISMISS_POLL_CHALLENGE_FORM: 'DISMISS_POLL_CHALLENGE_FORM',
  INIT_VENUES_PAGE: 'INIT_VENUES_PAGE',
  LOAD_VENUES_DATA_SUCCESS: 'LOAD_VENUES_DATA_SUCCESS',
  SET_SELECTED_VENUE: 'SET_SELECTED_VENUE',
  SET_VENUE_TOP_MINK: 'SET_VENUE_TOP_MINK',
  SHOW_WELCOME_FORM: 'SHOW_WELCOME_FORM',
  DISMISS_WELCOME_FORM: 'DISMISS_WELCOME_FORM',
  ANSWER_TOP_MINK: 'ANSWER_TOP_MINK',
  SET_CHALLENGE_FORM_DATA: 'SET_CHALLENGE_FORM_DATA',
  DISMISS_CHALLENGE_FORM: 'DISMISS_CHALLENGE_FORM',
  LOAD_RATES: 'LOAD_RATES',
  SET_VENUE_RATES: 'SET_VENUE_RATES',
  LOAD_MINKS: 'LOAD_MINKS',
  SET_VENUE_MINKS: 'SET_VENUE_MINKS',
  CREATE_MINK: 'CREATE_MINK',
  SET_ADDED_MINK_ID: 'SET_ADDED_MINK_ID',
  SET_SELECTED_MINK: 'SET_SELECTED_MINK',
  VOTE_MINK: 'VOTE_MINK',
  SHOW_VOTE_MINK_CONFIRMATION: 'SHOW_VOTE_MINK_CONFIRMATION',
  TRY_ANSWER_MINK: 'TRY_ANSWER_MINK',
  SET_ANSWER_MINK_STATUS: 'SET_ANSWER_MINK_STATUS',
  SET_MY_CORRECT_ANSWER: 'SET_MY_CORRECT_ANSWER',
  SET_SELECTED_TAG: 'SET_SELECTED_TAG',
  RATE_TAG: 'RATE_TAG',
  SHOW_RATE_TAG_CONFIRMATION: 'SHOW_RATE_TAG_CONFIRMATION',
  UPDATE_VENUE_RATE: 'UPDATE_VENUE_RATE',
  LOAD_POSTS: 'LOAD_POSTS',
  SET_SELECTED_POST: 'SET_SELECTED_POST',
  SET_VENUE_POSTS: 'SET_VENUE_POSTS',
  CREATE_POST: 'CREATE_POST',
  VOTE_POST: 'VOTE_POST',
  TOGGLE_POST_FLAG: 'TOGGLE_POST_FLAG',
  TOGGLE_MINK_FLAG: 'TOGGLE_MINK_FLAG',
  TOGGLE_FLAG_ERROR: 'TOGGLE_FLAG_ERROR',
  SHOW_VOTE_POST_CONFIRMATION: 'SHOW_VOTE_POST_CONFIRMATION',
  SET_PRIVATE_SHARE_ITEM_ID: 'SET_PRIVATE_SHARE_ITEM_ID',
  SET_PRIVATE_SHARE_RECIPIENT_ERROR: 'SET_PRIVATE_SHARE_RECIPIENT_ERROR',
  PRIVATE_SHARE: 'PRIVATE_SHARE',
  SET_PRIVATE_SHARE_SENDING: 'SET_PRIVATE_SHARE_SENDING',
  SET_NEW_MINK_ELECTED: 'SET_NEW_MINK_ELECTED',
  CLEAR_VENUES_DATA: 'CLEAR_VENUES_DATA',
  CREATE_VENUE: 'CREATE_VENUE',
  SET_LOADING: 'SET_LOADING',
};

export const clearVenuesData = () => ({
  type: actionTypes.CLEAR_VENUES_DATA,
});

export const initVenuesPage = (idToSelect) => ({
  type: actionTypes.INIT_VENUES_PAGE,
  payload: { idToSelect },
});

export const initPollsPage = (idToSelect) => ({
  type: actionTypes.INIT_POLLS_PAGE,
  payload: { idToSelect },
});

export const dismissWelcomeForm = () => ({
  type: actionTypes.DISMISS_WELCOME_FORM,
});

export const showWelcomeForm = () => ({
  type: actionTypes.SHOW_WELCOME_FORM,
  payload: { showWelcome: true },
});

export const loadPollsDataSuccess = (data) => {
  return {
    type: actionTypes.LOAD_POLLS_DATA_SUCCESS,
    data,
  };
};

export const loadVenuesDataSuccess = (data) => {
  return {
    type: actionTypes.LOAD_VENUES_DATA_SUCCESS,
    data,
  };
};

export const setSelectedVenue = (venue) => ({
  type: actionTypes.SET_SELECTED_VENUE,
  payload: { venue },
});

export const setVenueTopMink = (topMink) => ({
  type: actionTypes.SET_VENUE_TOP_MINK,
  payload: { topMink },
});

export const answerTopMink = (answer) => ({
  type: actionTypes.ANSWER_TOP_MINK,
  payload: { answer },
});

export const setChallengeFormData = (payload) => ({
  type: actionTypes.SET_CHALLENGE_FORM_DATA,
  payload,
});

export const dismissChallengeForm = (showMinks) => ({
  type: actionTypes.DISMISS_CHALLENGE_FORM,
  payload: { showMinks },
});

export const dismissPollChallengeForm = (showContactForm) => ({
  type: actionTypes.DISMISS_POLL_CHALLENGE_FORM,
  payload: { showContactForm },
});

export const loadRates = () => ({
  type: actionTypes.LOAD_RATES,
});

export const setVenueRates = (rates) => ({
  type: actionTypes.SET_VENUE_RATES,
  payload: { rates },
});

export const loadMinks = () => ({
  type: actionTypes.LOAD_MINKS,
});

export const setVenueMinks = (minks) => ({
  type: actionTypes.SET_VENUE_MINKS,
  payload: { minks },
});

export const createMink = (id, question, answer) => ({
  type: actionTypes.CREATE_MINK,
  payload: { id, question, answer },
});

export const setAddedMinkId = (addedMinkId) => ({
  type: actionTypes.SET_ADDED_MINK_ID,
  payload: { addedMinkId },
});

export const setSelectedMink = (selectedMinkId) => ({
  type: actionTypes.SET_SELECTED_MINK,
  payload: { selectedMinkId },
});

export const upvoteMink = () => ({
  type: actionTypes.VOTE_MINK,
  payload: { vote: 1 },
});

export const downvoteMink = () => ({
  type: actionTypes.VOTE_MINK,
  payload: { vote: -1 },
});

export const showVoteMinkConfirmation = (value) => ({
  type: actionTypes.SHOW_VOTE_MINK_CONFIRMATION,
  payload: { voteMinkConfirmation: value },
});

export const tryAnswerMink = (venueId, minkId, answer) => ({
  type: actionTypes.TRY_ANSWER_MINK,
  payload: { venueId, minkId, answer },
});

export const setAnswerMinkStatus = (answerMinkStatus) => ({
  type: actionTypes.SET_ANSWER_MINK_STATUS,
  payload: { answerMinkStatus },
});

export const setMyCorrectAnswer = (minkId, answer) => ({
  type: actionTypes.SET_MY_CORRECT_ANSWER,
  payload: {
    minkId,
    answer,
  },
});

export const setSelectedTag = (selectedTagId) => ({
  type: actionTypes.SET_SELECTED_TAG,
  payload: { selectedTagId },
});

export const rateTag = (rating, newTagId) => {
  console.log('# action dispatched: rateTag:', rating, newTagId);
  return {
    type: actionTypes.RATE_TAG,
    payload: { rating, newTagId },
  };
};

export const showRateTagConfirmation = (value) => ({
  type: actionTypes.SHOW_RATE_TAG_CONFIRMATION,
  payload: { rateTagConfirmation: value },
});

export const updateVenueRate = (venue) => ({
  type: actionTypes.UPDATE_VENUE_RATE,
  payload: { venue },
});

export const loadPosts = () => ({
  type: actionTypes.LOAD_POSTS,
});

export const setSelectedPost = (selectedPostId) => ({
  type: actionTypes.SET_SELECTED_POST,
  payload: { selectedPostId },
});

export const setVenuePosts = (posts) => ({
  type: actionTypes.SET_VENUE_POSTS,
  payload: { posts },
});

export const createPost = (id, title, message, venueType) => ({
  type: actionTypes.CREATE_POST,
  payload: { id, title, message, venueType },
});

export const upvotePost = () => ({
  type: actionTypes.VOTE_POST,
  payload: { vote: 1 },
});

export const togglePostFlag = () => ({
  type: actionTypes.TOGGLE_POST_FLAG,
});

export const toggleFlagError = (errorMessage) => ({
  type: actionTypes.TOGGLE_FLAG_ERROR,
  payload: { message: errorMessage },
});

export const toggleMinkFlag = () => ({
  type: actionTypes.TOGGLE_MINK_FLAG,
});

export const downvotePost = () => ({
  type: actionTypes.VOTE_POST,
  payload: { vote: -1 },
});

export const showVotePostConfirmation = (value) => ({
  type: actionTypes.SHOW_VOTE_POST_CONFIRMATION,
  payload: { votePostConfirmation: value },
});

export const setPrivateShareItemId = (id) => ({
  type: actionTypes.SET_PRIVATE_SHARE_ITEM_ID,
  payload: { privateShareItemId: id },
});

export const clearPrivateShareItemId = () => ({
  type: actionTypes.SET_PRIVATE_SHARE_ITEM_ID,
  payload: { privateShareItemId: undefined },
});

export const setPrivateShareRecipientError = (error) => ({
  type: actionTypes.SET_PRIVATE_SHARE_RECIPIENT_ERROR,
  payload: { privateShareRecipientError: error },
});

export const privateShare = (type, id, recipient, message) => ({
  type: actionTypes.PRIVATE_SHARE,
  payload: { type, id, recipient, message },
});

export const SEND_STATUS = {
  idle: 'idle',
  sending: 'sending',
  sent: 'sent',
};

export const setPrivateShareSending = (value) => ({
  type: actionTypes.SET_PRIVATE_SHARE_SENDING,
  payload: { privateShareSending: value },
});

export const setNewMinkElected = (newMinkElected) => ({
  type: actionTypes.SET_NEW_MINK_ELECTED,
  payload: { newMinkElected },
});

export const createVenue = (venue) => ({
  type: actionTypes.CREATE_VENUE,
  payload: { venue },
});

export const setLoading = (loading) => ({
  type: actionTypes.SET_LOADING,
  payload: { loading },
});
