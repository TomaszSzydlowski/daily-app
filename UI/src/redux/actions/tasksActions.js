import * as types from './actionTypes';
import * as taskApi from '../../services/taskService';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadTasksSuccess(tasks) {
  return { type: types.LOAD_TASKS_SUCCESS, tasks };
}

export function createTaskOptimistic(task) {
  return { type: types.CREATE_TASK_OPTIMISTIC, task };
}

export function updateTaskOptimistic(task) {
  return { type: types.UPDATE_TASK_OPTIMISTIC, task };
}

export function updateTasksPriorityOptimistic(tasksPriority) {
  return { type: types.UPDATE_TASKS_PRIORITY_OPTIMISTIC, tasksPriority };
}

export function pushTaskToDailyTasksOptimistic(task) {
  return { type: types.PUSH_TASK_TO_DAILY_TASKS_OPTIMISTIC, task };
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

export function saveTask(task) {
  return async function(dispatch) {
    try {
      const taskResponse = await taskApi.saveTask(task);
      task.id ? dispatch(updateTaskOptimistic(taskResponse)) : dispatch(createTaskOptimistic(taskResponse));
    } catch (error) {
      throw error;
    }
  };
}

export function updateTasksPriority(tasksPriority) {
  return function(dispatch) {
    // Doing optimistic update, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(updateTasksPriorityOptimistic(tasksPriority));
    return taskApi.updateTasksPriority(tasksPriority);
  };
}

export function pushTaskToDailyTasks(task) {
  return function(dispatch) {
    // Doing optimistic update, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    const currentTime = JSON.stringify(new Date()).slice(1, -1);
    task.toDoDate = currentTime;
    task.updateAt = currentTime;

    dispatch(pushTaskToDailyTasksOptimistic(task));
    return taskApi.update(task);
  };
}
