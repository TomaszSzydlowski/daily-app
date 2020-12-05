export const CREATE_NOTE = 'CREATE_NOTE';
export const LOAD_NOTES_SUCCESS = 'LOAD_NOTES_SUCCESS';
export const LOAD_PROJECTS_SUCCESS = 'LOAD_PROJECTS_SUCCESS';
export const CREATE_NOTE_SUCCESS = 'CREATE_NOTE_SUCCESS';
export const UPDATE_NOTE_SUCCESS = 'UPDATE_NOTE_SUCCESS';
export const BEGIN_API_CALL = 'BEGIN_API_CALL';
export const API_CALL_ERROR = 'API_CALL_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const GET_LOGIN_USER_FROM_TOKEN = 'GET_LOGIN_USER_FROM_TOKEN';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const SHOULD_REFRESH_TOKEN_SUCCESS = 'SHOULD_REFRESH_TOKEN_SUCCESS';
export const CLEAR_NOTES='CLEAR_NOTES';
export const CLEAR_PROJECTS='CLEAR_PROJECTS';
export const LOAD_TASKS_SUCCESS = 'LOAD_TASKS_SUCCESS';
export const LOAD_BACKLOG_SUCCESS = 'LOAD_BACKLOG_SUCCESS';

// By convention, actions that end in "_SUCCESS" are assumed to have been the result of a completed
// API call. But since we're doing an optimistic delete, we're hiding loading state.
// So this action name deliberately omits the "_SUCCESS" suffix.
// If it had one, our apiCallsInProgress counter would be decremented below zero
// because we're not incrementing the number of apiCallInProgress when the delete request begins.
export const DELETE_NOTE_OPTIMISTIC = 'DELETE_NOTE_OPTIMISTIC';
