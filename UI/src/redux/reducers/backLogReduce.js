import * as types from '../actions/actionTypes';
import initialState from './initialState';
import { getTaskToUpdateByPriority } from './common';

export default function backLogReduce(state = initialState.backLog, action) {
  switch (action.type) {
    case types.LOAD_BACKLOG_SUCCESS:
      return action.backLog;
    case types.UPDATE_BACKLOGS_PRIORITY_OPTIMISTIC:
      return getTaskToUpdateByPriority(state, action.tasksPriority);
    case types.REMOVE_TASK_FROM_BACKLOGS:
      return state.filter((task) => task.id !== action.task.id);
    default:
      return state;
  }
}
