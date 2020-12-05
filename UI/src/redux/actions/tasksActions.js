import * as types from './actionTypes';
import * as taskApi from '../../services/taskService';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadTasksSuccess(tasks) {
  return { type: types.LOAD_TASKS_SUCCESS, tasks };
}

export function loadTasks(taskDate) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const tasksResponse = await taskApi.getTasks(taskDate);
      dispatch(loadTasksSuccess(tasksResponse));
    } catch (error) {
      dispatch(apiCallError(error));
      throw error;
    }
  };
}
