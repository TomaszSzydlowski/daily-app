import axios from 'axios';

axios.defaults.baseURL = process.env.API_URL;

const Bearer = 'Bearer';
const Authorization = 'Authorization';

function setJwt(jwt) {
  axios.defaults.headers.common[Authorization] = Bearer + ' ' + jwt;
}

export async function handleResponse(response) {
  try {
    if (response.status === 400) {
      // So, a server-side validation error occurred.
      // Server side validation returns a string error message, so parse as text instead of json.
      const error = await response.text();
      throw new Error(error);
    }
    return response.data;
  } catch (error) {
    throw new Error('Network response was not ok.');
  }
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};