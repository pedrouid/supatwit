import { apiLogin, apiLogout } from '../helpers/api';

// -- Constants ------------------------------------------------------------- //
const AUTH_SIGNIN_REQUEST = 'auth/AUTH_SIGNIN_REQUEST';
const AUTH_SIGNIN_SUCCESS = 'auth/AUTH_SIGNIN_SUCCESS';
const AUTH_SIGNIN_FAILURE = 'auth/AUTH_SIGNIN_FAILURE';
const AUTH_SIGNOUT_REQUEST = 'auth/AUTH_SIGNOUT_REQUEST';
const AUTH_SIGNOUT_SUCCESS = 'auth/AUTH_SIGNOUT_SUCCESS';
const AUTH_SIGNOUT_FAILURE = 'auth/AUTH_SIGNOUT_FAILURE';
const AUTH_UPDATE_EMAIL = 'auth/AUTH_UPDATE_EMAIL';
const AUTH_UPDATE_PASSWORD = 'auth/AUTH_UPDATE_PASSWORD';

// -- Actions --------------------------------------------------------------- //

export const authLogin = (email, password) => dispatch => {
  dispatch({ type: AUTH_SIGNIN_REQUEST });
  apiLogin(email, password)
    .then(user => {
      dispatch({
        type: AUTH_SIGNIN_SUCCESS,
        payload: user
      });
      window.browserHistory.push('/dashboard');
    })
    .catch(error =>
      dispatch({
        type: AUTH_SIGNIN_FAILURE,
        payload: error.message
      })
    );
};

export const authLogout = () => dispatch => {
  dispatch({ type: AUTH_SIGNOUT_REQUEST });
  apiLogout()
    .then(() => {
      dispatch({ type: AUTH_SIGNOUT_SUCCESS });
      window.browserHistory.push('/login');
    })
    .catch(error =>
      dispatch({
        type: AUTH_SIGNOUT_FAILURE,
        payload: error.message
      })
    );
};

export const authUpdateEmail = email => ({
  type: AUTH_UPDATE_EMAIL,
  payload: email
});

export const authUpdatePassword = password => ({
  type: AUTH_UPDATE_PASSWORD,
  payload: password
});

// -- Reducer --------------------------------------------------------------- //
const INITIAL_STATE = {
  fetching: false,
  uid: '',
  email: '',
  password: '',
  profile: ''
};

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_SIGNIN_REQUEST:
    case AUTH_SIGNOUT_REQUEST:
      return { ...state, fetching: true };
    case AUTH_SIGNIN_SUCCESS:
      return {
        ...state,
        fetching: false,
        password: '',
        uid: action.payload.uid,
        email: action.payload.email,
        profile: action.payload.profile
      };
    case AUTH_SIGNOUT_SUCCESS:
      return {
        ...state,
        fetching: false,
        password: '',
        uid: '',
        email: '',
        profile: ''
      };
    case AUTH_SIGNIN_FAILURE:
    case AUTH_SIGNOUT_FAILURE:
      return { ...state, fetching: false };
    case AUTH_UPDATE_EMAIL:
      return { ...state, email: action.payload };
    case AUTH_UPDATE_PASSWORD:
      return { ...state, password: action.payload };
    default:
      return state;
  }
};
