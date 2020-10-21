import { combineReducers } from 'redux';
import notes from './noteReducer';
import projects from './projectReducer';
import apiCallsInProgress from './apiStatusReducer';
import loginUser from './authReducer';

const rootReducer = combineReducers({
  notes,
  projects,
  apiCallsInProgress,
  loginUser
});

export default rootReducer;
