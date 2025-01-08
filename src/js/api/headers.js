import { API_KEY } from './constants.js';

export function headers(accessToken = localStorage.getItem('accessToken')) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  console.log('Constructed Headers:', {
    'Content-Type': headers.get('Content-Type'),
    'X-Noroff-API-Key': headers.get('X-Noroff-API-Key'),
    Authorization: headers.get('Authorization'),
  });

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
