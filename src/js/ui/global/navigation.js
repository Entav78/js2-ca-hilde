import { basePath } from '../../api/constants.js';

export class Navigation {
  constructor(containerElements) {
    this.containers = Array.isArray(containerElements)
      ? containerElements
      : [containerElements];
    if (!this.containers || this.containers.length === 0) {
      throw new Error('No valid container elements provided to Navigation.');
    }
  }

  /**
   * Creates a navigation button and appends it to the provided navigation element.
   * @param {HTMLElement} nav - The navigation element to append the button to.
   * @param {string} text - The text to display on the button.
   * @param {string} path - The path to navigate to when the button is clicked.
   * @param {string} className - The CSS class to apply to the button.
   * @param {function} [onClick=null] - An optional click handler.
   * @returns {HTMLElement} - The created button element.
   */
  createButton(nav, text, path, className, onClick = null) {
    console.log(`Creating button: ${text}`);

    const listItem = document.createElement('li');
    listItem.className = 'nav-item';

    const button = document.createElement('a');
    button.textContent = text;
    button.className = `nav-link ${className}`;

    button.addEventListener('click', () => {
      event.preventDefault();
      event.stopPropagation(); // Prevent Bootstrap's offcanvas behavior interference

      if (path) {
        window.location.pathname = `${basePath}${path}`;
      } else if (onClick) {
        onClick();
      }
    });

    listItem.appendChild(button);
    nav.appendChild(listItem);
    return button;
  }

  /**
   * Creates the navigation bar with optional elements like Home and Login/Logout.
   * @param {boolean} isLoggedIn - Whether the user is logged in or not.
   * @param {Object} options - Additional options for the navigation.
   * @param {boolean} options.includeHomeButton - Whether to include the Home button.
   */
  /* test
  createNavbar(isLoggedIn, options = { includeHomeButton: true }) {
    this.containers.forEach((container) => {
      if (!container) {
        console.error('Navigation container not found.');
        return;
      }
      console.log('Updating navigation for container:', container);
      // Clear existing navigation content
      container.innerHTML = '';

      const nav = document.createElement('nav');
      const currentPage = window.location.pathname;

      // Add Home button if includeHomeButton is true
      if (options.includeHomeButton) {
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
        if (currentPage !== `${basePath}/profile/`) {
          this.createButton(nav, 'My Profile', '/profile/', 'profile-button');
        }
        this.createButton(nav, 'Logout', null, 'logout-button', () => {
          try {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userDetails');
            console.log('User logged out.');
            window.location.reload();
          } catch (error) {
            console.error('Error during logout:', error);
          }
        });
      } else {
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

      // Append the navigation to the current container
      container.appendChild(nav);
    });
  } 
    end test*/

  createNavbar(isLoggedIn, options = { includeHomeButton: true }) {
    this.containers.forEach((container) => {
      if (!container) {
        console.error('Navigation container not found.');
        return;
      }

      console.log('Updating navigation for container:', container);
      container.innerHTML = ''; // Clear existing navigation content

      const nav = document.createElement('nav');
      const currentPage = window.location.pathname;

      // Add Home button
      if (options.includeHomeButton) {
        if (currentPage !== `${basePath}/`) {
          this.createButton(nav, 'Home', '/', 'home-button');
          console.log('Creating Home button');
        }
      }

      // Add "Manage Post" button for logged-in users
      if (isLoggedIn && currentPage !== `${basePath}/post/manage/`) {
        this.createButton(
          nav,
          'Manage Post',
          '/post/manage/',
          'manage-post-button'
        );
        console.log('Creating Manage Post button');
      }

      // Add conditional buttons based on login state
      if (isLoggedIn) {
        if (currentPage !== `${basePath}/profile/`) {
          this.createButton(nav, 'My Profile', '/profile/', 'profile-button');
        }

        this.createButton(nav, 'Logout', null, 'logout-button', () => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('userDetails');
          console.log('User logged out.');
          window.location.reload();
        });
      } else {
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

      // Append the navigation to the current container
      container.appendChild(nav);
    });
  }
}
