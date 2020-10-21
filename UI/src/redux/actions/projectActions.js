import * as types from './actionTypes';
import * as projectApi from '../../services/projectService';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadProjectsSuccess(projects) {
  return { type: types.LOAD_PROJECTS_SUCCESS, projects };
}

export function loadProjects() {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const projectsResponse = await projectApi.getProjects();
      dispatch(loadProjectsSuccess(projectsResponse));
    } catch (error) {
      dispatch(apiCallError(error));
      throw error;
    }
  };
}
