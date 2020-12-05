import * as types from './actionTypes';
import * as taskApi from '../../services/taskService';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadBackLogSuccess(backLog) {
  return { type: types.LOAD_BACKLOG_SUCCESS, backLog };
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
