import "./css/style.css";
import router from "./js/router/index.js";
import { Navigation } from "./js/ui/global/navigation.js";

console.log("Router imported successfully");

// Function to initialize navigation
function initializeNavigation() {
  const navContainer = document.querySelector(".navigation-container");
  if (navContainer) {
    const isLoggedIn = !!localStorage.getItem("token");
    const nav = new Navigation(navContainer);
    nav.createNavbar(isLoggedIn, { 
      includeHomeButton: true,
      includeCreatePostButton: isLoggedIn,
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

