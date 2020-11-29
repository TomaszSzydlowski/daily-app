import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authReducer(state = initialState.loginUser, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return action.user;
    case types.REGISTER_SUCCESS:
      return action.user;
    case types.GET_LOGIN_USER_FROM_TOKEN:
      return action.user;
    case types.LOGOUT_SUCCESS:
      return action.user;
    default:
      return state;
  }
}
