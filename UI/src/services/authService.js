import http, { handleResponse } from './httpService';
import handleError from './logService';
import jwtDecode from 'jwt-decode';

const apiLoginEndpoint = process.env.API_URL + '/api/auth/login/';
const apiRegisterEndpoint = process.env.API_URL + '/api/auth/register/';

const tokenKey = 'token';

http.setJwt(getJwt());

function register(email, password) {
  return http.post(apiRegisterEndpoint, {
    email,
    password
  });
}

async function login(user) {
  try {
    const response = await http.post(apiLoginEndpoint, user);
    return handleResponse(response);
    // localStorage.setItem(tokenKey, jwt);
  } catch (error) {
    handleError(error);
  }
}

function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  register,
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt
};
