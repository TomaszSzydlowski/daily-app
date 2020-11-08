import { INote } from '../interfaces/INote';
import http, { handleResponse } from './httpService';
import handleError from "./logService";
const { API_PORT } = require("../../cliSettings.json");

const apiNotesEndpoint = API_PORT + '/api/notes/';

export const saveNote = async (note: INote) => {
  try {
    const response = note.id ? await http.put(apiNotesEndpoint + note.id, note) : await http.post(apiNotesEndpoint, note);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
}

export const getNotesDate = async (): Promise<string[]> => {
  try {
    const dates = "dates/"
    const response = await http.get(apiNotesEndpoint + dates);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
}

export const getNotesByDate = async (noteDate: string): Promise<INote[]> => {
  try {
    const param = `?Date=${noteDate}`;
    const response = await http.get(apiNotesEndpoint.slice(0, -1) + param);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
}