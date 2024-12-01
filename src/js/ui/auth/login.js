/*import { Login } from "../../api/auth/login.js";

/**
 * Handles form submission for user login.
 * Sends the email and password to the API and processes the response.
 *
 * @param {Event} event - The form submission event.
 */
/*
export async function onLogin(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const loginInstance = new Login();

  try {
    const userData = await loginInstance.login(data);

    // Save token to localStorage
    localStorage.setItem("token", userData.accessToken);
    console.log("Token saved to localStorage:", userData.accessToken);

    // Save user details to localStorage
    const userDetails = {
      name: userData.name,
      email: userData.email,
      avatar: userData.avatar,
      banner: userData.banner,
      bio: userData.bio,
    };
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    console.log("User details saved to localStorage:", userDetails);

    // Redirect to home
    alert("Login successful!");
    window.location.pathname = "/";
  } catch (error) {
    alert(`Login failed: ${error.message}`);
    console.error("Login error:", error);
  }
}
*/

import { API_AUTH_LOGIN } from "../constants.js";
import { headers } from "../headers.js";

export class Login {
  /**
   * Logs in a user with the provided email and password.
   *
   * @param {Object} data - The login data.
   * @param {string} data.email - The user's email address (required).
   * @param {string} data.password - The user's password (required).
   * @returns {Promise<Object>} A promise that resolves to the user's login response.
   */
  async login(data) {
    console.log("Data being sent to API for login:", data); // Log the request data

    try {
      const response = await fetch(API_AUTH_LOGIN, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(data),
      });

      console.log("Response object:", response);

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Error response from API:", errorResponse);

        const errorMessage =
          errorResponse?.errors?.[0]?.message ||
          errorResponse.message ||
          "Login failed.";
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      console.log("Successful login response:", responseData);

      // Extract the actual data payload
      return responseData.data || responseData;
    } catch (error) {
      console.error("Error during login:", error.message);
      throw error; // Re-throw the error to be handled by `handleLogin`
    }
  }

  async handleLogin(event) {
    event.preventDefault();

    const errorDiv = document.getElementById("login-error");
    errorDiv.textContent = ""; // Clear previous errors

    const formData = new FormData(event.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    console.log("Login data being sent:", data);

    try {
      const userData = await this.login(data);

      // Save token to localStorage
      localStorage.setItem("token", userData.accessToken);
      console.log("Token saved to localStorage:", userData.accessToken);

      // Save user details to localStorage
      const userDetails = {
        name: userData.name,
        email: userData.email,
        avatar: userData.avatar,
        banner: userData.banner,
        bio: userData.bio,
      };
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      console.log("User details saved to localStorage:", userDetails);

      // Redirect to home
      alert("Login successful!");
      window.location.pathname = "/"; // Update basePath if necessary
    } catch (error) {
      console.error("Error during login:", error.message);
      errorDiv.textContent = `Login failed: ${error.message}`;
    }
  }
}



