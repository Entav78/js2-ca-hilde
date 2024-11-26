/*import { Navigation } from "../../ui/global/navigation";

console.log("running profile page...");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded.");
  const navContainer = document.querySelector(".navigation-container");
  console.log("Navigation container found:", navContainer);

  if (navContainer) {
    const navigation = new Navigation(navContainer);
    const isLoggedIn = !!localStorage.getItem("token");
    console.log("Is user logged in:", isLoggedIn);
    navigation.createNavbar(isLoggedIn);
    console.log("Navigation setup completed.");
  } else {
    console.error("Navigation container not found.");
  }
});
*/

import { Navigation } from "../../ui/global/navigation";

console.log("Running profile page...");

function initializeNavigation() {
  const navContainer = document.querySelector(".navigation-container");
  console.log("Navigation container found:", navContainer);

  if (navContainer) {
    const navigation = new Navigation(navContainer);
    const isLoggedIn = !!localStorage.getItem("token");
    console.log("Is user logged in:", isLoggedIn);
    navigation.createNavbar(isLoggedIn);
    console.log("Navigation setup completed.");
  } else {
    console.error("Navigation container not found.");
  }
}

// Check if the DOM is already loaded
if (document.readyState === "loading") {
  // If the DOM is still loading, wait for it to fully load
  document.addEventListener("DOMContentLoaded", initializeNavigation);
} else {
  // If the DOM is already loaded, run the initialization immediately
  initializeNavigation();
}










