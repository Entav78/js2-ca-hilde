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

  // Check if accessToken exists and is valid
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken || accessToken === "undefined") {
    alert("You must be logged in to view this page");
    console.warn("AuthGuard: No valid accessToken found, redirecting to home.");
    window.location.pathname = `${basePath}/`;
    console.log("Current Path:", window.location.pathname);
    return;
  }

  console.log("AuthGuard: User is authenticated, proceeding.");
}


