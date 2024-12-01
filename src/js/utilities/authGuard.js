/*export function authGuard() {
  if (!localStorage.token) {
    alert("You must be logged in to view this page");
    window.location.href = "/auth/login/";
  }
}
*/
import { basePath } from "../api/constants.js";

export function authGuard() {
  const publicPaths = ["/", "/auth/login/", "/auth/register/"];
  
  // Skip guard for public paths
  if (publicPaths.includes(window.location.pathname)) return;

  // Redirect if not logged in
  if (!localStorage.token) {
    alert("You must be logged in to view this page");
    window.location.pathname = `${basePath}/`;
   // window.location.reload();
    console.log(window.location.pathname)
  }
}
