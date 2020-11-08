import { IProject } from '../interfaces/IProject';
import http, { handleResponse } from './httpService';
import handleError from "./logService";
const { API_PORT } = require("../../cliSettings.json");

const apiProjectsEndpoint = API_PORT + '/api/projects/';

export async function getProjects(): Promise<IProject[]> {
  try {
    const response = await http.get(apiProjectsEndpoint)
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
}

export const getProjectsByIds = async (ids: string[]): Promise<IProject[]> => {
  try {
    const param = buildParams(ids);
    const response = await http.get(apiProjectsEndpoint.slice(0, -1) + param);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
}

const buildParams = (ids: string[]) => {
  let query = "?";
  for (let i = 0; i < ids.length; i++) {
    if (i === 0) {
      query += `ids=${ids[i]}`
    }
    query += `&ids=${ids[i]}`
  }
  return query;
}