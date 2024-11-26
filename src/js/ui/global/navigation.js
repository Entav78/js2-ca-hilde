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

/*one more test to make it run smooth
export class Navigation {
  constructor(containerElement) {
    if (!(containerElement instanceof HTMLElement)) {
      throw new Error("Invalid container element provided to Navigation.");
    }
    this.container = containerElement;
  }

  createNavbar(isLoggedIn, options = { includeHomeButton: true }) {
    if (!this.container) {
      console.error("Navigation container not found.");
      return;
    }

    this.container.innerHTML = "";

    const nav = document.createElement("nav");

    if (options.includeHomeButton) {
      this.createHomeButton(nav);
    }

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
*/

export class Navigation {
  /**
   * Initializes the Navigation with a container element.
   * @param {HTMLElement} containerElement - The container element where the navigation will be rendered.
   */
  constructor(containerElement) {
    if (!(containerElement instanceof HTMLElement)) {
      throw new Error("Invalid container element provided to Navigation.");
    }
    this.container = containerElement;
  }

  /**
   * Creates the navigation bar with optional elements like Home and Login/Logout.
   * @param {boolean} isLoggedIn - Whether the user is logged in or not.
   * @param {Object} options - Additional options for the navigation.
   * @param {boolean} options.includeHomeButton - Whether to include the Home button.
   */
  createNavbar(isLoggedIn, options = { includeHomeButton: true }) {
    if (!this.container) {
      console.error("Navigation container not found.");
      return;
    }

    // Clear existing navigation content
    this.container.innerHTML = "";

    const nav = document.createElement("nav");

    // Optionally add the Home button
    if (options.includeHomeButton) {
      this.createHomeButton(nav);
    }

    // Add Logout button if logged in
    if (isLoggedIn) {
      const logoutButton = document.createElement("button");
      logoutButton.textContent = "Logout";
      logoutButton.addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.reload();
      });
      nav.appendChild(logoutButton);
    } else {
      // Add Login button if not logged in
      const loginLink = document.createElement("button");
      loginLink.textContent = "Login";
      loginLink.addEventListener("click", () => {
        window.location.pathname = "/auth/login/";
      });
      nav.appendChild(loginLink);
    }

    // Append the navigation bar to the container
    this.container.appendChild(nav);
  }

  /**
   * Creates a Home button and appends it to the provided navigation element.
   * @param {HTMLElement} nav - The navigation element to append the Home button to.
   */
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







