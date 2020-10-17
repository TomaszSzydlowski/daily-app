import http from './httpService';
import jwtDecode from 'jwt-decode';

const apiLoginEndpoint = 'api/auth/login';
const apiRegisterEndpoint = 'api/auth/register';

const tokenKey = 'token';

http.setJwt(getJwt());

function register(user) {
  return http.post(apiRegisterEndpoint, {
    email: user.email,
    password: user.password
  });
}

async function login(email, password) {
  const { data: jwt } = await http.post(apiLoginEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
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
