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
  createButton(nav, text, path, className, onClick = null) {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = `btn btn-outline-light ${className}`;

    const fullPath = path ? `${basePath}${path}` : null;

    // Highlight the active page
    if (fullPath && window.location.pathname === fullPath) {
      button.classList.add('active', 'btn-light');
      button.classList.remove('btn-outline-light');
    }

    // Add click behavior
    if (onClick) {
      button.addEventListener('click', onClick);
    } else if (fullPath) {
      button.addEventListener('click', () => {
        window.location.pathname = fullPath;
      });
    }

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
        console.log('Creating Home button');
      }
    }

    if (isLoggedIn && currentPage !== `${basePath}/post/manage/`) {
      this.createButton(
        nav,
        'Manage Post',
        '/post/manage/',
        'manage-post-button'
      );
      console.log('Creating Manage Post button');
    }

    if (isLoggedIn) {
      // "My Profile" button
      if (currentPage !== `${basePath}/profile/`) {
        this.createButton(nav, 'My Profile', '/profile/', 'profile-button');
      }

      // Logout button
      this.createButton(
        nav,
        'Logout',
        null, // No path for logout
        'logout-button',
        () => {
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
        }
      );
    } else {
      // Login button
      if (currentPage !== `${basePath}/auth/login/`) {
        this.createButton(nav, 'Login', '/auth/login/', 'login-button');
      }

      // Register button
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
