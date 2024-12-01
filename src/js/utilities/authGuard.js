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
  if (publicPaths.includes(window.location.pathname)) {
    console.log("Public path, auth guard skipped:", window.location.pathname);
    return;
  }

  // Check if token exists and is valid
  const token = localStorage.getItem("token");

  if (!token || token === "undefined") {
    alert("You must be logged in to view this page");
    console.warn("AuthGuard: No valid token found, redirecting to home.");
    window.location.pathname = `${basePath}/`;
    return;
  }

  console.log("AuthGuard: User is authenticated, proceeding.");
}

