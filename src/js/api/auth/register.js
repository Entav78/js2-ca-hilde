/*import { register } from "../../api/auth/register.js";*/


/* This section is provided from Noroff.
 * Registers a new user with the provided details.
 *
 * @param {Object} data - The registration data.
 * @param {string} data.name - The user's name (required).
 * @param {string} data.email - The user's email address (required).
 * @param {string} data.password - The user's password (required).
 *
 * **OPTIONAL VALUES**
 *
 * @param {string} [data.bio] - A brief biography of the user (optional).
 * @param {Object} [data.avatar] - The user's avatar information (optional).
 * @param {string} [data.avatar.url] - URL for the user's avatar image.
 * @param {string} [data.avatar.alt] - Alt text for the user's avatar image.
 * @param {Object} [data.banner] - The user's banner information (optional).
 * @param {string} [data.banner.url] - URL for the user's banner image.
 * @param {string} [data.banner.alt] - Alt text for the user's banner image.
 * @param {boolean} [data.venueManager] - Indicates if the user is a venue manager (optional, used for holidaze).
 * @returns {Promise<Object>} A promise that resolves to the user's registration response.
 
export async function register({
  name,
  email,
  password,
  bio,
  avatar,
  banner,
  venueManager,
}) {}
*/

import { API_AUTH_REGISTER } from "../constants.js";
import { headers } from "../headers.js";

export class Register {
  /**
   * Registers a new user with the provided details.
   *
   * @param {Object} data - The registration data.
   * @param {string} data.name - The user's name (required).
   * @param {string} data.email - The user's email address (required).
   * @param {string} data.password - The user's password (required).
   * @param {string} [data.bio] - A brief biography of the user (optional).
   * @param {Object} [data.avatar] - The user's avatar information (optional).
   * @param {string} [data.avatar.url] - URL for the user's avatar image.
   * @param {string} [data.avatar.alt] - Alt text for the user's avatar image.
   * @param {Object} [data.banner] - The user's banner information (optional).
   * @param {string} [data.banner.url] - URL for the user's banner image.
   * @param {string} [data.banner.alt] - Alt text for the user's banner image.
   * @param {boolean} [data.venueManager] - Indicates if the user is a venue manager (optional).
   * @returns {Promise<Object>} A promise that resolves to the user's registration response.
   */
  async register(data) {
    // Remove any empty avatar or banner objects
    if (!data.avatar.url && !data.avatar.alt) {
      delete data.avatar;
    }
    if (!data.banner.url && !data.banner.alt) {
      delete data.banner;
    }

    // Remove null values
    const sanitizedData = JSON.parse(JSON.stringify(data, (key, value) => 
      value === null ? undefined : value
    ));

    console.log("Data being sent:", sanitizedData);

    try {
      const response = await fetch(API_AUTH_REGISTER, { 
        method: "POST",
        headers: headers(),
        body: JSON.stringify(sanitizedData),
      });
      console.log("Response object:", response);
      if (!response.ok) {
        throw new Error("Registration failed.");
      }
      return await response.json();
    } catch (error) {
      console.error(`Error during registration: ${error.message}`);
      throw error;
    }
  }

  async handleRegister(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      bio: formData.get("bio") || null,
      avatar: {
        url: formData.get("avatarUrl") || null,
        alt: formData.get("avatarAlt") || null,
      },
      banner: {
        url: formData.get("bannerUrl") || null,
        alt: formData.get("bannerAlt") || null,
      },
      venueManager: formData.get("venueManager") === "on",
    };

    try {
      const user = await this.register(data);
      alert("Registration successful!");
      window.location.href = "/auth/login/";
    } catch (error) {
      alert(`Registration failed: ${error.message}`);
    }
  }
}


