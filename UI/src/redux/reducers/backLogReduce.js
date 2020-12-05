import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function backLogReduce(state = initialState.backLog, action) {
  switch (action.type) {
    case types.LOAD_BACKLOG_SUCCESS:
      return action.backLog;
    default:
      return state;
  }
}
