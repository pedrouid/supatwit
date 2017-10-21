import { combineReducers } from 'redux';
import auth from './_auth';
import dashboard from './_dashboard';

export default combineReducers({
  auth,
  dashboard
});
