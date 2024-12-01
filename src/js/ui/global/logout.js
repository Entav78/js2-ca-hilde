/**
 * Functions you attach to logout events that calls ui/auth/logout function
 */

/*testing logout in Navigation
import { onLogout } from "../auth/logout";

export function setLogoutListener(buttonId) {
  const logoutButton = document.getElementById(buttonId);
  if (logoutButton) {
    logoutButton.addEventListener("click", onLogout);
  }

}
*/

import { onLogout } from "../auth/logout.js";

export function setLogoutListener(button) {
  if (button) {
    button.addEventListener("click", onLogout);
  }
}
