import { setLogoutListener } from "../global/logout.js";

export class Navigation {
  constructor(containerElement) {
    if (!(containerElement instanceof HTMLElement)) {
      throw new Error("Invalid container element provided to Navigation.");
    }
    this.container = containerElement;
  }

  /**
   * Creates a navigation button and appends it to the provided navigation element.
   * @param {HTMLElement} nav - The navigation element to append the button to.
   * @param {string} text - The text to display on the button.
   * @param {string} path - The path to navigate to when the button is clicked.
   * @param {string} className - The CSS class to apply to the button.
   * @returns {HTMLElement} - The created button element.
   */
  createButton(nav, text, path, className) {
    const button = document.createElement("button");
    button.textContent = text;
    button.className = className;

    button.addEventListener("click", () => {
      window.location.pathname = path;
    });

    nav.appendChild(button);
    return button;
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

    // Add buttons based on login status and current page
    if (options.includeHomeButton && window.location.pathname !== "/") {
      this.createButton(nav, "Home", "/", "home-button");
    }

    if (isLoggedIn && window.location.pathname !== "/profile/") {
      this.createButton(nav, "Profile", "/profile/", "profile-button");
    }

    if (isLoggedIn && window.location.pathname !== "/post/manage/") {
      this.createButton(nav, "Create Post", "/post/manage/", "create-post-button");
    }

    if (isLoggedIn) {
      // Create the Logout button
      const logoutButton = this.createButton(nav, "Logout", "/", "logout-button");

      // Attach the logout listener
      setLogoutListener(logoutButton);
    } else {
      this.createButton(nav, "Login", "/auth/login/", "login-button");
      this.createButton(nav, "Register", "/auth/register/", "register-button");
    }

    // Append the navigation bar to the container
    this.container.appendChild(nav);
  }
}









