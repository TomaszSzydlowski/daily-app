import * as types from './actionTypes';
import * as noteApi from '../../services/noteSevice';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadNoteSuccess(notes) {
  return { type: types.LOAD_NOTES_SUCCESS, notes };
}

export function createNoteSuccess(note) {
  return { type: types.CREATE_NOTE_SUCCESS, note };
}

export function updateNoteSuccess(note) {
  return { type: types.UPDATE_NOTE_SUCCESS, note };
}

export function deleteNoteOptimistic(note) {
  return { type: types.DELETE_NOTE_OPTIMISTIC, note };
}

export function clearNotes(){
  return { type: types.CLEAR_NOTES, notes:[] };
}

export function clearNotesAction(){
  return async function(dispatch) {
    try {
      dispatch(clearNotes());
    } catch (error) {
      throw error;
    }
  };
}

export function loadNotes() {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const notesResponse = await noteApi.getNotes();
      dispatch(loadNoteSuccess(notesResponse));
    } catch (error) {
      dispatch(apiCallError(error));
      throw error;
    }
  };
}

export function saveNote(note) {
  //eslint-disable-next-line no-unused-vars
  return async function(dispatch, getState) {
    dispatch(beginApiCall());
    try {
      const savedNoteResponse = await noteApi.saveNote(note);
      note.id ? dispatch(updateNoteSuccess(savedNoteResponse)) : dispatch(createNoteSuccess(savedNoteResponse));
    } catch (error) {
      dispatch(apiCallError(error));
      throw error;
    }
  };
}

export function deleteNote(note) {
  return function(dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteNoteOptimistic(note));
    return noteApi.deleteNote(note.id);
  };
}
