export class Navigation {
  constructor(containerId) {
    this.containerId = containerId;
  }

  createHomeButton() {
    const container = document.getElementById(this.containerId);

    if (!container) {
      console.error(`Container with ID '${this.containerId}' not found.`);
      return;
    }

    const homeButton = document.createElement("button");
    homeButton.id = "goToHome";
    homeButton.textContent = "Home";

    homeButton.addEventListener("click", () => {
      console.log("Home button clicked.");
      window.location.pathname = "/"; // Use window.location since router is already in app.js
    });

    container.appendChild(homeButton);
    console.log("Home button added to navigation.");
  }
}



