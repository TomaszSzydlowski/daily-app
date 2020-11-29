import { beginApiCall, apiCallError } from './apiStatusActions';
import * as types from './actionTypes';
import jwtDecode from 'jwt-decode';
import authApi from '../../services/authService';

export function loginSuccess(user) {
  return { type: types.LOGIN_SUCCESS, user };
}

export function registerSuccess(user) {
  return { type: types.REGISTER_SUCCESS, user };
}

export function getLoginUserFromTokenSuccess(user) {
  return { type: types.GET_LOGIN_USER_FROM_TOKEN, user };
}

export function logoutSuccess() {
  return { type: types.LOGOUT_SUCCESS, user:{} };
}

export function login(user) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const loginResponse = await authApi.login(user);
      authApi.loginWithJwt(loginResponse);
      const decodedJWT = jwtDecode(loginResponse);
      dispatch(loginSuccess(decodedJWT));
    } catch (error) {
      dispatch(apiCallError(error));
      throw error;
    }
  };
}

export function register(email, password) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const { headers } = await authApi.register(email, password);
      authApi.loginWithJwt(headers['authorization']);
      const decodedJWT = jwtDecode(headers['authorization']);
      dispatch(registerSuccess(decodedJWT));
    } catch (error) {
      dispatch(apiCallError(error));
      throw error;
    }
  };
}

export function getLoginUserFromToken() {
  return async function(dispatch) {
    try {
      const jwt = authApi.getCurrentUser() || {};
      dispatch(getLoginUserFromTokenSuccess(jwt));
    } catch (error) {
      throw error;
    }
  };
}

export function logout() {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      authApi.logout();
      dispatch(logoutSuccess());
    } catch (error) {
      throw error;
    }
  };
}
