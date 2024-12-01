/*import { Login } from "../../api/auth/login.js";
import { basePath } from "../constants.js";

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
    window.location.pathname = `${basePath}/`;
    //window.location.pathname = "/";
  } catch (error) {
    alert(`Login failed: ${error.message}`);
    console.error("Login error:", error);
  }
}
*/

import { Login } from "../../api/auth/login.js";
import { basePath } from "../constants.js";

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
    window.location.pathname = `${basePath}/`;
  } catch (error) {
    alert(`Login failed: ${error.message}`);
    console.error("Login error:", error);
  }
}

// Function to add event listener to the login form
function setupLoginForm() {
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    console.log("Adding event listener to login form...");
    loginForm.addEventListener("submit", onLogin);
  } else {
    console.error("Login form not found.");
  }
}

// Ensure DOM is ready before setting up the login form
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupLoginForm);
} else {
  setupLoginForm();
}



