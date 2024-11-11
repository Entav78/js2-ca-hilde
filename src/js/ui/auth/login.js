/**
 * This function should pass data to the login function in api/auth and handle the response
 

export async function onLogin(event) {
  
}
 */ 

import { Login } from "../../api/auth/login.js";

/**
 * Handles form submission for user login.
 * Sends the email and password to the API and processes the response.
 *
 * @param {Event} event - The form submission event.
 */
export async function onLogin(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const loginInstance = new Login();

  try {
    const user = await loginInstance.login(data);
    alert("Login successful!");
    localStorage.setItem("token", user.token); // Assuming `user.token` contains the token
    window.location.href = "/profile/";
  } catch (error) {
    alert(`Login failed: ${error.message}`);
  }
}

