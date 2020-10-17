import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiLoginEndpoint = "api/auth/login";
const apiRegisterEndpoint = "api/auth/register";

const tokenKey = "token";

http.setJwt(getJwt());

export function register(user) {
  return http.post(apiRegisterEndpoint, {
    email: user.email,
    password: user.password,
  });
}

export async function login(email, password) {
  const { data: jwt } = await http.post(apiLoginEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export function getJwt() {
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
