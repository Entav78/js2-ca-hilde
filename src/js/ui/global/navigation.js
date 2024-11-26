export class Navigation {
  constructor(container) {
    this.container = container; 
  }

  createNavbar(isLoggedIn) {
    if (!this.container) {
      console.error("Navigation container not found.");
      return;
    }

    this.container.innerHTML = "";

    const nav = document.createElement("nav");

    this.createHomeButton(nav);

    if (isLoggedIn) {
      const logoutButton = document.createElement("button");
      logoutButton.textContent = "Logout";
      logoutButton.addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.reload();
      });
      nav.appendChild(logoutButton);
    } else {
      const loginLink = document.createElement("button");
      loginLink.textContent = "Login";
      loginLink.addEventListener("click", () => {
        window.location.pathname = "/auth/login/";
      });
      nav.appendChild(loginLink);
    }

    this.container.appendChild(nav);
  }

  createHomeButton(nav) {
    const homeButton = document.createElement("button");
    homeButton.textContent = "Home";
    homeButton.addEventListener("click", () => {
      window.location.pathname = "/";
    });
    nav.appendChild(homeButton);
  }
}








