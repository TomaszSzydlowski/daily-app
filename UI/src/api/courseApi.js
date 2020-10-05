import { handleResponse, handleError } from './apiUtils';
const baseUrl = process.env.API_URL + '/courses/';

export async function getCourses() {
  try {
    const response = await fetch(baseUrl);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
}

export async function saveCourse(course) {
  try {
    const response = await fetch(baseUrl + (course.id || ''), {
      method: course.id ? 'PUT' : 'POST', // POST for create, PUT to update when id already exists.
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(course)
    });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
}

export async function deleteCourse(courseId) {
  try {
    const response = await fetch(baseUrl + courseId, { method: 'DELETE' });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
}
