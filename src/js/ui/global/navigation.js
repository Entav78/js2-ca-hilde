/*export class Navigation {
  constructor(containerClass) {
    this.container = document.querySelector(`.${containerClass}`);
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
      logoutButton.className = "logout-button"; 
      logoutButton.addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.reload();
      });
      nav.appendChild(logoutButton);
    } else {
      const loginButton = document.createElement("button");
      loginButton.textContent = "Login";
      loginButton.className = "login-button"; 
      loginButton.addEventListener("click", () => {
        window.location.pathname = "/auth/login/";
      });
      nav.appendChild(loginButton);
    }

    this.container.appendChild(nav); 
  }

  createHomeButton(nav) {
    const homeButton = document.createElement("button");
    homeButton.textContent = "Home";
    homeButton.className = "home-button"; 
    homeButton.addEventListener("click", () => {
      window.location.pathname = "/";
    });
    nav.appendChild(homeButton); 
  }
}
testing new Navigation class*/

export class Navigation {
  constructor(containerElement) {
    if (!(containerElement instanceof HTMLElement)) {
      throw new Error("Invalid container element provided to Navigation.");
    }
    this.container = containerElement;
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
    homeButton.className = "home-button";
    homeButton.addEventListener("click", () => {
      window.location.pathname = "/";
    });
    nav.appendChild(homeButton);
  }
}







