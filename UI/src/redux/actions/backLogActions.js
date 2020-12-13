import * as types from './actionTypes';
import * as taskApi from '../../services/taskService';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadBackLogSuccess(backLog) {
  return { type: types.LOAD_BACKLOG_SUCCESS, backLog };
}

export function updateBackLogsPriorityOptimistic(tasksPriority) {
  return { type: types.UPDATE_BACKLOGS_PRIORITY_OPTIMISTIC, tasksPriority };
}

export function removeTaskFromBackLogsOptimistic(task) {
  return { type: types.REMOVE_TASK_FROM_BACKLOGS, task };
}

export function loadBackLog() {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const backLogResponse = await taskApi.getBackLog();
      dispatch(loadBackLogSuccess(backLogResponse));
    } catch (error) {
      dispatch(apiCallError(error));
      throw error;
    }
  };
}

export function updateBackLogsPriority(tasksPriority) {
  return function(dispatch) {
    // Doing optimistic update, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    // update backlog tasks use the same api endpoint as tasks
    dispatch(updateBackLogsPriorityOptimistic(tasksPriority));
    return taskApi.updateTasksPriority(tasksPriority);
  };
}

export function removeTaskFromBackLogs(task) {
  return function(dispatch) {
    // Doing optimistic update, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    // update backlog tasks use the same api endpoint as tasks
    // only updateStore, api is updated by pushTaskToDailyTasks
    return dispatch(removeTaskFromBackLogsOptimistic(task));
  };
}
