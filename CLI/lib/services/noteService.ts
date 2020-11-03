import http, { handleResponse } from './httpService';
import handleError from "./logService";
const { API_PORT } = require("../../cliSettings.json");

const apiNotesEndpoint = API_PORT + '/api/notes/';

export async function saveNote(note) {
  try {
    const response = note.id ? await http.put(apiNotesEndpoint + note.id, note) : await http.post(apiNotesEndpoint, note);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
}