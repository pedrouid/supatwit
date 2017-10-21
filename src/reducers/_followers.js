import { twitterFollowers } from '../helpers/api';

// -- Constants ------------------------------------------------------------- //
const FOLLOWERS_FOLLOW_REQUEST = 'auth/FOLLOWERS_FOLLOW_REQUEST';
const FOLLOWERS_FOLLOW_SUCCESS = 'auth/FOLLOWERS_FOLLOW_SUCCESS';
const FOLLOWERS_FOLLOW_FAILURE = 'auth/FOLLOWERS_FOLLOW_FAILURE';

const FOLLOWERS_UNFOLLOW_REQUEST = 'auth/FOLLOWERS_UNFOLLOW_REQUEST';
const FOLLOWERS_UNFOLLOW_SUCCESS = 'auth/FOLLOWERS_UNFOLLOW_SUCCESS';
const FOLLOWERS_UNFOLLOW_FAILURE = 'auth/FOLLOWERS_UNFOLLOW_FAILURE';

// -- Actions --------------------------------------------------------------- //

export const followersFollow = username => dispatch => {
  dispatch({ type: FOLLOWERS_FOLLOW_REQUEST });
  twitterFollowers(username, true)
    .then(user => {
      dispatch({
        type: FOLLOWERS_FOLLOW_SUCCESS,
        payload: user
      });
    })
    .catch(error =>
      dispatch({
        type: FOLLOWERS_FOLLOW_FAILURE,
        payload: error.message
      })
    );
};

export const followersUnfollow = username => dispatch => {
  dispatch({ type: FOLLOWERS_UNFOLLOW_REQUEST });
  twitterFollowers(username, false)
    .then(() => {
      dispatch({ type: FOLLOWERS_UNFOLLOW_SUCCESS });
      window.browserHistory.push('/login');
    })
    .catch(error =>
      dispatch({
        type: FOLLOWERS_UNFOLLOW_FAILURE,
        payload: error.message
      })
    );
};

// -- Reducer --------------------------------------------------------------- //
const INITIAL_STATE = {
  fetching: false
};

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FOLLOWERS_FOLLOW_REQUEST:
    case FOLLOWERS_UNFOLLOW_REQUEST:
      return { ...state, fetching: true };
    case FOLLOWERS_FOLLOW_SUCCESS:
    case FOLLOWERS_UNFOLLOW_SUCCESS:
    case FOLLOWERS_FOLLOW_FAILURE:
    case FOLLOWERS_UNFOLLOW_FAILURE:
      return { ...state, fetching: false };
    default:
      return state;
  }
};
