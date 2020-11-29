import { beginApiCall, apiCallError } from './apiStatusActions';
import * as types from './actionTypes';
import authApi from '../../services/authService';

export function shouldRefreshTokenSuccess(shouldRefreshToken) {
  return { type: types.SHOULD_REFRESH_TOKEN_SUCCESS, shouldRefreshToken };
}

export function shouldRefreshTokenAction(shouldRefreshToken) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      dispatch(shouldRefreshTokenSuccess(shouldRefreshToken));
    } catch (error) {
      dispatch(apiCallError(error));
      throw error;
    }
  };
}

export function checkFreshnessTokenAction() {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const shouldRefreshToken = await authApi.checkFreshnessToken();
      dispatch(shouldRefreshTokenSuccess(shouldRefreshToken));
    } catch (error) {
      dispatch(apiCallError(error));
      throw error;
    }
  };
}
