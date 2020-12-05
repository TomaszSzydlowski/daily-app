import { combineReducers } from 'redux';
import notes from './noteReducer';
import projects from './projectReducer';
import tasks from './taskReducer';
import backLog from './backLogReduce';
import apiCallsInProgress from './apiStatusReducer';
import loginUser from './authReducer';
import shouldRefreshToken from './refreshTokenReducer';

const rootReducer = combineReducers({
  notes,
  projects,
  tasks,
  backLog,
  apiCallsInProgress,
  loginUser,
  shouldRefreshToken
});

export default rootReducer;
