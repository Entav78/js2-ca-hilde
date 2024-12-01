import { onLogin } from "../../ui/auth/login.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.forms.login; // Target the form using its `name`

  if (loginForm) {
    loginForm.addEventListener("submit", onLogin); // Attach the onLogin function
    console.log("Login form event listener attached.");
  } else {
    console.error("Login form not found!");
  }
});

