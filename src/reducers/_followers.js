import { apiGetConfig, apiTwitterFollowers } from '../helpers/api';

// -- Constants ------------------------------------------------------------- //
const FOLLOWERS_GET_CONFIG_REQUEST = 'followers/FOLLOWERS_GET_CONFIG_REQUEST';
const FOLLOWERS_GET_CONFIG_SUCCESS = 'followers/FOLLOWERS_GET_CONFIG_SUCCESS';
const FOLLOWERS_GET_CONFIG_FAILURE = 'followers/FOLLOWERS_GET_CONFIG_FAILURE';

const FOLLOWERS_FOLLOW_REQUEST = 'followers/FOLLOWERS_FOLLOW_REQUEST';
const FOLLOWERS_FOLLOW_SUCCESS = 'followers/FOLLOWERS_FOLLOW_SUCCESS';
const FOLLOWERS_FOLLOW_FAILURE = 'followers/FOLLOWERS_FOLLOW_FAILURE';

const FOLLOWERS_UNFOLLOW_REQUEST = 'followers/FOLLOWERS_UNFOLLOW_REQUEST';
const FOLLOWERS_UNFOLLOW_SUCCESS = 'followers/FOLLOWERS_UNFOLLOW_SUCCESS';
const FOLLOWERS_UNFOLLOW_FAILURE = 'followers/FOLLOWERS_UNFOLLOW_FAILURE';

// -- Actions --------------------------------------------------------------- //

export const followersGetConfig = username => dispatch => {
  dispatch({ type: FOLLOWERS_GET_CONFIG_REQUEST });
  apiGetConfig(username)
    .then(snapshot =>
      dispatch({
        type: FOLLOWERS_GET_CONFIG_SUCCESS,
        payload: snapshot.val()
      })
    )
    .catch(error =>
      dispatch({
        type: FOLLOWERS_GET_CONFIG_FAILURE,
        payload: error.message
      })
    );
};

export const followersFollow = username => (dispatch, getState) => {
  const config = getState().followers.config;
  config.access_token = config.access_token_key;
  dispatch({ type: FOLLOWERS_FOLLOW_REQUEST });
  apiTwitterFollowers(config, username, false)
    .then(user => dispatch({ type: FOLLOWERS_FOLLOW_SUCCESS }))
    .catch(error =>
      dispatch({
        type: FOLLOWERS_FOLLOW_FAILURE,
        payload: error
      })
    );
};

export const followersUnfollow = username => (dispatch, getState) => {
  const config = getState().followers.config;
  config.access_token = config.access_token_key;
  dispatch({ type: FOLLOWERS_UNFOLLOW_REQUEST });
  apiTwitterFollowers(config, username, true)
    .then(() => dispatch({ type: FOLLOWERS_UNFOLLOW_SUCCESS }))
    .catch(error =>
      dispatch({
        type: FOLLOWERS_UNFOLLOW_FAILURE,
        payload: error
      })
    );
};

// -- Reducer --------------------------------------------------------------- //
const INITIAL_STATE = {
  fetching: false,
  config: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FOLLOWERS_GET_CONFIG_REQUEST:
    case FOLLOWERS_FOLLOW_REQUEST:
    case FOLLOWERS_UNFOLLOW_REQUEST:
      return { ...state, fetching: true };
    case FOLLOWERS_GET_CONFIG_SUCCESS:
      return { ...state, fetching: false, config: action.payload };
    case FOLLOWERS_GET_CONFIG_FAILURE:
      return { ...state, ...INITIAL_STATE };
    case FOLLOWERS_FOLLOW_SUCCESS:
    case FOLLOWERS_UNFOLLOW_SUCCESS:
    case FOLLOWERS_FOLLOW_FAILURE:
    case FOLLOWERS_UNFOLLOW_FAILURE:
      return { ...state, fetching: false };
    default:
      return state;
  }
};
