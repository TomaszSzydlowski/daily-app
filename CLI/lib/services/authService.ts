import http, { handleResponse } from './httpService';
import handleError from "./logService";
const { API_PORT } = require("../../cliSettings.json");

const apiLoginEndpoint = API_PORT + '/api/auth/login/';

export async function login(user) {
  try {
    const response = await http.post(apiLoginEndpoint, user);
    return handleResponse(response);
  } catch (error) {
    if (error.response.status === 401) {
      throw error;
    }
    console.log(error)
    handleError(error);
  }
}