/**
 * Functions you attach to logout events that calls ui/auth/logout function
 */
import { onLogout } from "../auth/logout";

export function setLogoutListener(buttonId) {
  const logoutButton = document.getElementById(buttonId);
  if (logoutButton) {
    logoutButton.addEventListener("click", onLogout);
  }

}
