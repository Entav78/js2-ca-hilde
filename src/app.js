
import router from "./js/router/index.js";
import { Navigation } from "./js/ui/global/navigation.js";

console.log("Router imported successfully");

// Function to initialize navigation
function initializeNavigation() {
  const navContainer = document.querySelector(".navigation-container");
  if (navContainer) {
    const navigation = new Navigation(navContainer); // Create Navigation instance

    // Function to dynamically update the navigation bar
    function updateNavbar() {
      const isLoggedIn = !!localStorage.getItem("token"); // Check login status
      navigation.createNavbar(isLoggedIn, { includeHomeButton: true });
      console.log("Navigation updated. Is Logged In:", isLoggedIn);
    }

    // Call initially to set up the navbar
    updateNavbar();

    // Set up a listener to detect login/logout changes
    window.addEventListener("storage", (event) => {
      if (event.key === "token") {
        console.log("Token storage change detected, updating navigation...");
        updateNavbar(); // Re-render the navigation bar
      }
    });

    console.log("Navigation setup completed.");
  } else {
    console.error("Navigation container not found.");
  }
}



// Function to initialize the application
async function initializeApp() {
  // Initialize navigation
  initializeNavigation();

  // Initialize router
  await router(window.location.pathname);
  console.log("Router initialized.");
}

// Ensure the DOM is ready before initializing the app
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}

