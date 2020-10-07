import { combineReducers } from 'redux';
import notes from './noteReducer';
import projects from './projectReducer';
import apiCallsInProgress from './apiStatusReducer';

const rootReducer = combineReducers({
  notes,
  projects,
  apiCallsInProgress
});

export default rootReducer;
