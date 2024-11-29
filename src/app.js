import "./css/style.css";
import router from "./js/router/index.js";
import { Navigation } from "./js/ui/global/navigation.js";

console.log("Router imported successfully");

// Function to initialize navigation
function initializeNavigation() {
  const navContainer = document.querySelector(".navigation-container");
  if (navContainer) {
    const isLoggedIn = !!localStorage.getItem("token"); // Check login status
    const navigation = new Navigation(navContainer); // Create Navigation instance

    // Call createNavbar with the necessary options
    navigation.createNavbar(isLoggedIn, { includeHomeButton: true });
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

