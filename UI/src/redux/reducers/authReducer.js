import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function loginReducer(state = initialState.loginUser, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return action.user;
    case types.GET_LOGIN_USER_FROM_TOKEN_SUCCESS:
      return action.user;
    case types.LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
}
