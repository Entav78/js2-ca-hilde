/*import { onLogin } from "../../ui/auth/login.js";

// Ensure the DOM is fully loaded before attaching the event listener
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.forms.login;

    if (form) {
      // Remove any existing event listener to avoid duplicates
      form.removeEventListener("submit", onLogin);
      form.addEventListener("submit", onLogin);
      console.log("Login form event listener attached.");
    } else {
      console.error("Login form not found.");
    }
  });
} else {
  const form = document.forms.login;

  if (form) {
    // Remove any existing event listener to avoid duplicates
    form.removeEventListener("submit", onLogin);
    form.addEventListener("submit", onLogin);
    console.log("Login form event listener attached.");
  } else {
    console.error("Login form not found.");
  }
}
*/

import { onLogin } from "../../ui/auth/login.js";

// Ensure DOM readiness
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    attachLoginListener();
  });
} else {
  attachLoginListener();
}

function attachLoginListener() {
  const form = document.forms.login;
  if (form) {
    form.removeEventListener("submit", onLogin);
    form.addEventListener("submit", onLogin);
    console.log("Login form event listener attached.");
  } else {
    console.error("Login form not found.");
  }
}
