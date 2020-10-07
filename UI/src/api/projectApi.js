import { handleResponse, handleError } from './apiUtils';
const baseUrl = process.env.API_URL + '/projects/';

export async function getProjects() {
  try {
    const response = await fetch(baseUrl);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}
