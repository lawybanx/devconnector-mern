import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postReducer from './postReducer';
import profileReducer from './profileReucer';

export default combineReducers({
  auth: authReducer,
  // post: postReducer,
  // profile: profileReducer,
});
