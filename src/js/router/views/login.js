import { onLogin } from "../../ui/auth/login.js";

console.log("login is running before eventlistener");
document.addEventListener("DOMContentLoaded", () => {
  console.log("Login.js is running");
console.log("Constants path:", "../../api/constants.js");
console.log("Headers path:", "../../api/headers.js");

  const form = document.forms.login;
  if (form) {
    form.removeEventListener("submit", onLogin); // Prevent duplicate listeners
    form.addEventListener("submit", onLogin);
    console.log("Login form event listener attached.");
  } else {
    console.error("Login form not found.");
  }
});

