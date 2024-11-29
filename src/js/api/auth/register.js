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
    console.log("Data being sent to API:", data); // Log the request data

    try {
        const response = await fetch(API_AUTH_REGISTER, {
            method: "POST",
            headers: headers(),
            body: JSON.stringify(data),
        });

        console.log("Response object:", response);

        // Check if the response is OK
        if (!response.ok) {
            const errorResponse = await response.json(); // Parse the error response
            console.error("Error response from API:", errorResponse);

            // Extract and throw a meaningful error message
            const errorMessage =
                errorResponse?.errors?.[0]?.message ||
                errorResponse.message ||
                "Registration failed.";
            throw new Error(errorMessage);
        }

        const responseData = await response.json();
        console.log("Successful registration response:", responseData);
        return responseData;
    } catch (error) {
        console.error("Error during registration:", error.message);
        throw error; // Re-throw the error to be handled by `handleRegister`
    }
}




async handleRegister(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const rawData = {
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

  if (!rawData.avatar.url && !rawData.avatar.alt) delete rawData.avatar;
  if (!rawData.banner.url && !rawData.banner.alt) delete rawData.banner;

  const sanitizedData = JSON.parse(JSON.stringify(rawData, (key, value) =>
      value === null ? undefined : value
  ));

  console.log("Sanitized data being sent:", sanitizedData);

  try {
      const user = await this.register(sanitizedData);
      alert("Registration successful!");
      window.location.pathname = "/auth/login/";
  } catch (error) {
      console.error("Error during registration:", error.message);

      // Display the error message to the user
      alert(`Registration failed: ${error.message}`);
  }
}





}

