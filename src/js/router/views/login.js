import { onLogin } from "../../ui/auth/login.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.forms.login;
if (form) {
  form.addEventListener("submit", onLogin);
  console.log("Login form event listener attached.");
} else {
  console.error("Login form not found.");
}
});

