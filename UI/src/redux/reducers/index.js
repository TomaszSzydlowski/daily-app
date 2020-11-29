import { combineReducers } from 'redux';
import notes from './noteReducer';
import projects from './projectReducer';
import apiCallsInProgress from './apiStatusReducer';
import loginUser from './authReducer';
import shouldRefreshToken from './refreshTokenReducer';

const rootReducer = combineReducers({
  notes,
  projects,
  apiCallsInProgress,
  loginUser,
  shouldRefreshToken
});

export default rootReducer;
