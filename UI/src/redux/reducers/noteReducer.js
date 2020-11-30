import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function noteReducer(state = initialState.notes, action) {
  switch (action.type) {
    case types.CREATE_NOTE_SUCCESS:
      return [ { ...action.note }, ...state ];
    case types.UPDATE_NOTE_SUCCESS:
      return state.map((note) => (note.id === action.note.id ? action.note : note));
    case types.LOAD_NOTES_SUCCESS:
      return action.notes;
    case types.DELETE_NOTE_OPTIMISTIC:
      return state.filter((note) => note.id !== action.note.id);
    case types.CLEAR_NOTES:
      return action.notes;
    default:
      return state;
  }
}
