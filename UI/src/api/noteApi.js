import { handleResponse, handleError } from './apiUtils';
const baseUrl = process.env.API_URL + '/notes/';

export async function getNotes() {
  try {
    const response = await fetch(baseUrl);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
}

export async function saveNote(note) {
  try {
    const noteToSave = { ...note };
    noteToSave.date = new Date(noteToSave.date).toJSON();
    const response = await fetch(baseUrl + (note.id || ''), {
      method: note.id ? 'PUT' : 'POST', // POST for create, PUT to update when id already exists.
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(noteToSave)
    });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
}

export async function deleteNote(noteId) {
  try {
    const response = await fetch(baseUrl + noteId, { method: 'DELETE' });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
}
