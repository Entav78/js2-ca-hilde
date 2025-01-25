import router from './js/router/index.js';
import { Navigation } from './js/ui/global/navigation.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

//import './scss/main.scss';

console.log('Router imported successfully');

// Function to initialize navigation
function initializeNavigation() {
  const wideScreenNav = document.querySelector('.navbar-nav');
  const sidebarNav = document.querySelector('.offcanvas-body .navbar-nav');

  const containers = [];
  if (wideScreenNav) containers.push(wideScreenNav);
  if (sidebarNav) containers.push(sidebarNav);

  if (containers.length === 0) {
    console.error('No navigation containers found.');
    return;
  }

  console.log('Wide Screen Nav:', wideScreenNav);
  console.log('Sidebar Nav:', sidebarNav);

  const navigation = new Navigation(containers);

  function updateNavbar() {
    const accessToken = localStorage.getItem('accessToken');
    const isLoggedIn = !!accessToken;
    console.log('Access token:', accessToken);
    console.log('Navigation updated. Is Logged In:', isLoggedIn);

    navigation.createNavbar(isLoggedIn, { includeHomeButton: true });
  }

  updateNavbar();

  window.addEventListener('storage', (event) => {
    if (event.key === 'accessToken') {
      updateNavbar();
    }
  });

  console.log('Navigation setup completed.');
}

// Function to initialize the application
async function initializeApp() {
  // Initialize navigation
  initializeNavigation();

  // Initialize router
  await router(window.location.pathname);
  console.log('Router initialized.');
}

// Ensure the DOM is ready before initializing the app
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
