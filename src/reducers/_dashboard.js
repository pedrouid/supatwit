import { apiGetConfig, apiTwitterDetails, apiTwitterFollowers } from '../helpers/api';

// -- Constants ------------------------------------------------------------- //
const DASHBOARD_GET_DETAILS_REQUEST = 'dashboard/DASHBOARD_GET_DETAILS_REQUEST';
const DASHBOARD_GET_DETAILS_SUCCESS = 'dashboard/DASHBOARD_GET_DETAILS_SUCCESS';
const DASHBOARD_GET_DETAILS_FAILURE = 'dashboard/DASHBOARD_GET_DETAILS_FAILURE';

const DASHBOARD_GET_CONFIG_REQUEST = 'dashboard/DASHBOARD_GET_CONFIG_REQUEST';
const DASHBOARD_GET_CONFIG_SUCCESS = 'dashboard/DASHBOARD_GET_CONFIG_SUCCESS';
const DASHBOARD_GET_CONFIG_FAILURE = 'dashboard/DASHBOARD_GET_CONFIG_FAILURE';

const DASHBOARD_FOLLOWERS_FOLLOW_REQUEST = 'dashboard/DASHBOARD_FOLLOWERS_FOLLOW_REQUEST';
const DASHBOARD_FOLLOWERS_FOLLOW_SUCCESS = 'dashboard/DASHBOARD_FOLLOWERS_FOLLOW_SUCCESS';
const DASHBOARD_FOLLOWERS_FOLLOW_FAILURE = 'dashboard/DASHBOARD_FOLLOWERS_FOLLOW_FAILURE';

const DASHBOARD_FOLLOWERS_UNFOLLOW_REQUEST = 'dashboard/DASHBOARD_FOLLOWERS_UNFOLLOW_REQUEST';
const DASHBOARD_FOLLOWERS_UNFOLLOW_SUCCESS = 'dashboard/DASHBOARD_FOLLOWERS_UNFOLLOW_SUCCESS';
const DASHBOARD_FOLLOWERS_UNFOLLOW_FAILURE = 'dashboard/DASHBOARD_FOLLOWERS_UNFOLLOW_FAILURE';

// -- Actions --------------------------------------------------------------- //

export const dashboardGetDetails = () => (dispatch, getState) => {
  const config = getState().dashboard.config;
  dispatch({ type: DASHBOARD_GET_DETAILS_REQUEST });
  apiTwitterDetails(config)
    .then(({ data }) => dispatch({ type: DASHBOARD_GET_DETAILS_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: DASHBOARD_GET_DETAILS_FAILURE, payload: error.message }));
};

export const dashboardGetConfig = () => (dispatch, getState) => {
  const uid = getState().auth.uid;
  dispatch({ type: DASHBOARD_GET_CONFIG_REQUEST });
  apiGetConfig(uid)
    .then(snapshot => {
      const config = snapshot.val();
      config.access_token = config.access_token_key;
      dispatch({
        type: DASHBOARD_GET_CONFIG_SUCCESS,
        payload: config
      });
      dashboardGetDetails()(dispatch, getState);
    })
    .catch(error =>
      dispatch({
        type: DASHBOARD_GET_CONFIG_FAILURE,
        payload: error.message
      })
    );
};

export const dashboardFollowersFollow = username => (dispatch, getState) => {
  const config = getState().dashboard.config;
  dispatch({ type: DASHBOARD_FOLLOWERS_FOLLOW_REQUEST });
  apiTwitterFollowers(config, username, false)
    .then(user => dispatch({ type: DASHBOARD_FOLLOWERS_FOLLOW_SUCCESS }))
    .catch(error =>
      dispatch({
        type: DASHBOARD_FOLLOWERS_FOLLOW_FAILURE,
        payload: error
      })
    );
};

export const dashboardFollowersUnfollow = username => (dispatch, getState) => {
  const config = getState().dashboard.config;
  dispatch({ type: DASHBOARD_FOLLOWERS_UNFOLLOW_REQUEST });
  apiTwitterFollowers(config, username, true)
    .then(() => dispatch({ type: DASHBOARD_FOLLOWERS_UNFOLLOW_SUCCESS }))
    .catch(error =>
      dispatch({
        type: DASHBOARD_FOLLOWERS_UNFOLLOW_FAILURE,
        payload: error
      })
    );
};

// -- Reducer --------------------------------------------------------------- //
const INITIAL_STATE = {
  fetching: false,
  config: {},
  name: '',
  username: '',
  profile_image: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DASHBOARD_GET_DETAILS_REQUEST:
    case DASHBOARD_GET_CONFIG_REQUEST:
    case DASHBOARD_FOLLOWERS_FOLLOW_REQUEST:
    case DASHBOARD_FOLLOWERS_UNFOLLOW_REQUEST:
      return { ...state, fetching: true };
    case DASHBOARD_GET_CONFIG_SUCCESS:
      return {
        ...state,
        fetching: false,
        config: action.payload,
        username: action.payload.username
      };
    case DASHBOARD_GET_DETAILS_SUCCESS:
      return {
        ...state,
        fetching: false,
        name: action.payload.name,
        username: action.payload.username,
        profile_image: action.payload.profile_image
      };
    case DASHBOARD_GET_DETAILS_FAILURE:
      return {
        ...state,
        fetching: false,
        name: '',
        username: '',
        profile_image: ''
      };
    case DASHBOARD_GET_CONFIG_FAILURE:
      return { ...state, ...INITIAL_STATE };
    case DASHBOARD_FOLLOWERS_FOLLOW_SUCCESS:
    case DASHBOARD_FOLLOWERS_UNFOLLOW_SUCCESS:
    case DASHBOARD_FOLLOWERS_FOLLOW_FAILURE:
    case DASHBOARD_FOLLOWERS_UNFOLLOW_FAILURE:
      return { ...state, fetching: false };
    default:
      return state;
  }
};
