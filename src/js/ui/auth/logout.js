/**
 * This function should log the user out by removing aproppriate user data from the browser.
 */
/*import router from "../../router";

export function onLogout() {
  localStorage.removeItem("token");
  router("/");
}
*/
import { basePath } from "../api/constants.js";
// testing creating logout in Navigation
export function onLogout() {
  try {
    console.log("Executing logout...");
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    
    alert("You have been logged out.");
    window.location.pathname = `${basePath}/auth/login/`;
  } catch (error) {
    console.error("Error during logout:", error);
  }
}
