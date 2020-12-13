import * as types from '../actions/actionTypes';
import initialState from './initialState';
import { getTaskToUpdateByPriority } from './common';

export default function taskReducer(state = initialState.tasks, action) {
  switch (action.type) {
    case types.LOAD_TASKS_SUCCESS:
      return action.tasks;
    case types.UPDATE_TASKS_PRIORITY_OPTIMISTIC:
      return getTaskToUpdateByPriority(state, action.tasksPriority);
    case types.PUSH_TASK_TO_DAILY_TASKS_OPTIMISTIC:
      return [ ...state, { ...action.task } ];
    default:
      return state;
  }
}
