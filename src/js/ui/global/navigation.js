
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
  createNavbar(isLoggedIn, options = { includeHomeButton: true, includeCreatePostButton: false }) {
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

    console.log("isLoggedIn:", isLoggedIn);
    console.log("includeCreatePostButton:", options.includeCreatePostButton);

    // Add "Create Post" button if logged in and option is enabled
    if (isLoggedIn && options.includeCreatePostButton) {
      console.log("Creating Create Post button...");
      this.createCreatePostButton(nav);
    }

    // Add Logout button if logged in
    if (isLoggedIn) {
      const logoutButton = document.createElement("button");
      logoutButton.textContent = "Logout";
      logoutButton.className = "logout-button";
      logoutButton.addEventListener("click", () => {
        try {
          localStorage.removeItem("token");
          localStorage.removeItem("userDetails");
          console.log("User logged out. Token and user details cleared from localStorage.");
          
          window.location.reload();
        } catch (error) {
          console.error("Error during logout:", error);
        }
      });
      nav.appendChild(logoutButton);
    }
    else {
      // Add Login button if not logged in
      const loginButton = document.createElement("button");
      loginButton.textContent = "Login";
      loginButton.className = "login-button";
      loginButton.addEventListener("click", () => {
        window.location.pathname = "/auth/login/";
      });
      nav.appendChild(loginButton);
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

  createCreatePostButton(nav) {
    console.log("Executing createCreatePostButton...");
    const createPostButton = document.createElement("button");
    createPostButton.textContent = "Create Post";
    createPostButton.className = "create-post-button";

    console.log("Create Post button created:", createPostButton);

    createPostButton.addEventListener("click", () => {
      console.log("Create Post button clicked!");
      window.location.pathname = "/post/manage/";
    });

    nav.appendChild(createPostButton);
    console.log("Create Post button appended to nav:", nav);
  }
}







