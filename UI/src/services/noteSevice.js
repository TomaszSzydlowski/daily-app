import http, { handleResponse } from './httpService';
import handleError from './logService';

const baseUrl = process.env.API_URL + '/api/notes/';

export async function getNotes() {
  try {
    const response = await http.get(baseUrl);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
}

export async function saveNote(note) {
  try {
    const noteToSave = { ...note };
    noteToSave.date = new Date(noteToSave.date).toJSON();
    const response = note.id ? await http.put(baseUrl, noteToSave) : await http.post(baseUrl, noteToSave);
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
