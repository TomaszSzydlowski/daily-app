// In a real app, would likely call an error logging service.
export default function handleError(error) {
  // eslint-disable-next-line no-console
  console.error('API call failed. ' + error);
  throw error;
}
