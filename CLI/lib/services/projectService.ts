import http, { handleResponse } from './httpService';
import handleError from "./logService";
const { API_PORT } = require("../../cliSettings.json");

const apiProjectsEndpoint = API_PORT + '/api/projects/';

export async function getProjects() {
  try {
    const response = await http.get(apiProjectsEndpoint)
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
}