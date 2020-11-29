import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function refreshTokenReducer(state = initialState.shouldRefreshToken, action) {
  switch (action.type) {
    case types.SHOULD_REFRESH_TOKEN_SUCCESS:
      return action.shouldRefreshToken;
    default:
      return state;
  }
}
