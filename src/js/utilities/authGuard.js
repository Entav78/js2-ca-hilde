/*export function authGuard() {
  if (!localStorage.token) {
    alert("You must be logged in to view this page");
    window.location.href = "/auth/login/";
  }
}
*/
import { basePath } from '../api/constants.js';

export function authGuard() {
  const publicPaths = ['/', '/auth/login/', '/auth/register/']; // Define public paths
  const currentPath = window.location.pathname;

  // Allow access to public paths
  if (publicPaths.includes(currentPath)) {
    console.log('Public path, auth guard skipped:', currentPath);
    return;
  }

  // Check for accessToken in localStorage
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken || accessToken === 'undefined') {
    // Redirect if accessToken is missing or invalid
    alert('You must be logged in to view this page');
    console.warn('AuthGuard: No valid accessToken found, redirecting to home.');
    window.location.pathname = `${basePath}/`;
    return;
  }

  // If accessToken exists, log its presence
  console.log('AuthGuard: User is authenticated, proceeding.');
}
