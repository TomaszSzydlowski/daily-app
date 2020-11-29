import http, { handleResponse } from './httpService';
import handleError from './logService';
import jwtDecode from 'jwt-decode';

const apiLoginEndpoint = process.env.API_URL + '/api/auth/login/';
const apiRegisterEndpoint = process.env.API_URL + '/api/auth/register/';
const apiIsUserAuthorizedEndpoint = process.env.API_URL + '/api/auth/isUserAuthorized/';

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
    http.setJwt(response.data);
    localStorage.setItem(tokenKey, response.data);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
}

function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

function logout() {
  http.setJwt(null);
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

async function shouldRefreshToken() {
  try {
    const response = await http.get(apiIsUserAuthorizedEndpoint);
    if (response.status === 200) {
      return false;
    }
    return true;
  } catch (error) {
    return true;
  }
}

// async function shouldRefreshTokenNow(){
//   try {
//     const response = await http.get(apiIsUserAuthorizedEndpoint);
//     if (response.status !== 200) {
//       http.setJwt(null);
//       localStorage.removeItem(tokenKey);
//     }
//   } catch (error) {
//     return true;
//   }
// }

function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  register,
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
  checkFreshnessToken: shouldRefreshToken
};
