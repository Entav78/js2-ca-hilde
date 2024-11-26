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

import { API_KEY } from "./constants.js";

export function headers(token = null) {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");

  if (API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY);
  }

  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  return headers;
}

