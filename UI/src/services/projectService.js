import http, { handleResponse } from './httpService';
import handleError from './logService';

const baseUrl = process.env.API_URL + '/api/projects/';

export async function getProjects() {
  try {
    const response = await http.get(baseUrl);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}
