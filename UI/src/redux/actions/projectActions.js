import * as types from './actionTypes';
import * as projectApi from '../../services/projectService';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadProjectsSuccess(projects) {
  return { type: types.LOAD_PROJECTS_SUCCESS, projects };
}

export function clearProjects() {
  return { type: types.CLEAR_PROJECTS, projects: [] };
}

export function clearProjectsAction() {
  return async function(dispatch) {
    try {
      dispatch(clearProjects());
    } catch (error) {
      throw error;
    }
  };
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
