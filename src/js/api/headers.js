/*import { API_KEY } from "./constants.js";

export function headers() {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");

  if (API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY);
  }

  return headers;
}
Testing new headers with bearer token*/

/*another test
export function headers(token = null) {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("X-Noroff-API-Key", import.meta.env.VITE_API_KEY); // Use the API key

  if (token) {
    headers.append("Authorization", `Bearer ${token}`); // Add token only when provided
  }

  return headers;
}
*/
import { API_KEY } from './constants.js';

export function headers(accessToken = localStorage.getItem('accessToken')) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  // Include API Key in headers
  if (API_KEY) {
    headers.append('X-Noroff-API-Key', API_KEY);
  }

  // Include Authorization header if accessToken exists
  if (accessToken) {
    headers.append('Authorization', `Bearer ${accessToken}`);
  }

  return headers;
}
