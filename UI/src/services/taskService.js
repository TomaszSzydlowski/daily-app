import http, { handleResponse } from './httpService';
import handleError from './logService';

const baseUrl = process.env.API_URL + '/api/tasks/';
const backLogUrl = process.env.API_URL + '/api/tasks/backlog/';

export async function getTasks(taskDate) {
  try {
    const param = `?Date=${taskDate}`;
    const response = await http.get(baseUrl.slice(0, -1) + param);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
}

export async function getBackLog() {
  try {
    const response = await http.get(backLogUrl);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
}

export async function updateTasksPriority(tasks) {
  try {
    const response = await http.put(baseUrl + 'priority/', tasks);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
}

export async function update(task) {
  try {
    const response = await http.put(baseUrl, task);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
}
