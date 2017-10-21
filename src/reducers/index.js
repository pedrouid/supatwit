import { combineReducers } from 'redux';
import auth from './_auth';
import followers from './_followers';

export default combineReducers({
  auth,
  followers
});
