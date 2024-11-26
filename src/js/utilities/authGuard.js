/*export function authGuard() {
  if (!localStorage.token) {
    alert("You must be logged in to view this page");
    window.location.href = "/auth/login/";
  }
}
*/
export function authGuard() {
  const publicPaths = ["/", "/auth/login/", "/auth/register/"];
  
  // Skip guard for public paths
  if (publicPaths.includes(window.location.pathname)) return;

  // Redirect if not logged in
  if (!localStorage.token) {
    alert("You must be logged in to view this page");
    window.location.pathname = "/auth/login/";
    window.location.reload();
    console.log(window.location.pathname)
  }
}
