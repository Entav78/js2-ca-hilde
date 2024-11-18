/**
 * This function should log the user out by removing aproppriate user data from the browser.
 */
import router from "../../router";

export function onLogout() {
  localStorage.removeItem("token");
  router("/");
}
