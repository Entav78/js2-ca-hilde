/*Original file from Noroff:
  Logs in a user with the provided email and password.
 
  @param {Object} data - The login data.
  @param {string} data.email - The user's email address.
  @param {string} data.password - The user's password.
  @returns {Promise<Object>} A promise that resolves to the user's login response.
  @throws {Error} Error if the login fails.
 

export async function login({ email, password }) {}
*/

import { API_AUTH_LOGIN } from "../constants.js";
import { headers } from "../headers.js";

export class Login {
  /**
   * Logs in a user with the provided email and password.
   *
   * @param {Object} data - The login data.
   * @param {string} data.email - The user's email address.
   * @param {string} data.password - The user's password.
   * @returns {Promise<Object>} A promise that resolves to the user's login response.
   * @throws {Error} Error if the login fails.
   */
  async login(data) {
    try {
      const response = await fetch(API_AUTH_LOGIN, { 
        method: "POST",
        headers: headers(), 
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Login failed.");
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Error during login: ${error.message}`);
    }
  }
}
  

