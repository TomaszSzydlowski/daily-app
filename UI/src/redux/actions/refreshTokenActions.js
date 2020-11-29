import { beginApiCall, apiCallError } from './apiStatusActions';
import * as types from './actionTypes';
import authApi from '../../services/authService';

export function shouldNotRefreshTokenSuccess() {
  return { type: types.SHOULD_NOT_REFRESH_TOKEN_SUCCESS, shouldRefreshToken: false };
}

export function shouldRefreshTokenSuccess() {
  return { type: types.SHOULD_REFRESH_TOKEN_SUCCESS, shouldRefreshToken: true };
}

export function shouldRefreshToken() {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      dispatch(shouldRefreshTokenSuccess());
    } catch (error) {
      dispatch(apiCallError(error));
      throw error;
    }
  };
}

export function shouldNotRefreshToken() {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      dispatch(shouldNotRefreshTokenSuccess());
    } catch (error) {
      dispatch(apiCallError(error));
      throw error;
    }
  };
}

export function checkFreshnessToken() {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const shouldRefreshToken = await authApi.checkFreshnessToken();

      if (shouldRefreshToken) {
        dispatch(shouldRefreshTokenSuccess());
      } else {
        dispatch(shouldNotRefreshTokenSuccess());
      }
    } catch (error) {
      dispatch(apiCallError(error));
      throw error;
    }
  };
}
