import http, { handleResponse } from './httpService';
import handleError from "./logService";
const { API_PORT } = require("../../cliSettings.json");

const apiLoginEndpoint = API_PORT + '/api/auth/login/';
const apiRegisterEndpoint = API_PORT + '/api/auth/register/';

export async function login(user) {
  try {
    const response = await http.post(apiLoginEndpoint, user);
    http.setJwt(response.data);
    return handleResponse(response);
  } catch (error) {
    if (error.response.status === 401) {
      throw error;
    }
    console.log(error)
    handleError(error);
  }
}

export async function register(email, password) {
  try {
    const response = await http.post(apiRegisterEndpoint, { email, password })
    return handleResponse(response);
  } catch (error) {
    console.log(error)
    handleError(error);
  }
};