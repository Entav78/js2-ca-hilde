//import { setLogoutListener } from "../global/logout.js";
import { basePath } from '../../api/constants.js';

export class Navigation {
  constructor(containerElement) {
    if (!(containerElement instanceof HTMLElement)) {
      throw new Error('Invalid container element provided to Navigation.');
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
    const button = document.createElement('button');
    button.textContent = text;
    button.className = className;

    // Add the basePath to the path
    const fullPath = `${basePath}${path}`;

    // Check if the button corresponds to the current page
    if (window.location.pathname === fullPath) {
      button.classList.add('active'); // Add the 'active' class for styling
    }

    button.addEventListener('click', () => {
      window.location.pathname = fullPath;
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
      console.error('Navigation container not found.');
      return;
    }

    // Clear existing navigation content
    this.container.innerHTML = '';

    const nav = document.createElement('nav');
    const currentPage = window.location.pathname; // Get the current page

    // Add Home button if includeHomeButton is true
    if (options.includeHomeButton) {
      // Add Home button regardless of the current page
      if (currentPage !== `${basePath}/`) {
        this.createButton(nav, 'Home', '/', 'home-button');
      }
    }

    // Add navigation buttons for logged-in users
    if (isLoggedIn) {
      // Add "My Profile" button unless you're already on the profile page
      if (currentPage !== `${basePath}/profile/`) {
        this.createButton(nav, 'My Profile', '/profile/', 'profile-button');
      }

      // Add Logout button
      const logoutButton = document.createElement('button');
      logoutButton.textContent = 'Logout';
      logoutButton.className = 'logout-button';
      logoutButton.addEventListener('click', () => {
        try {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('userDetails');
          console.log(
            'User logged out. Token and user details cleared from localStorage.'
          );
          window.location.reload();
        } catch (error) {
          console.error('Error during logout:', error);
        }
      });
      nav.appendChild(logoutButton);
    } else {
      // Add Login and Register buttons for logged-out users
      if (currentPage !== `${basePath}/auth/login/`) {
        this.createButton(nav, 'Login', '/auth/login/', 'login-button');
      }
      if (currentPage !== `${basePath}/auth/register/`) {
        this.createButton(
          nav,
          'Register',
          '/auth/register/',
          'register-button'
        );
      }
    }

    this.container.appendChild(nav);
  }
}
