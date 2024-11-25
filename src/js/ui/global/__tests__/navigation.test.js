/*The original test, stored for later

import { describe, it, expect, beforeEach, vi } from "vitest";
import { Navigation } from "../navigation";

describe("Navigation", () => {
  let container;

  beforeEach(() => {
    document.body.innerHTML = '<div id="navContainer"></div>';
    container = document.getElementById("navContainer");
  });

  it("should add a 'Home' button to the container", () => {
    const navigation = new Navigation("navContainer");
    navigation.createHomeButton();

    const homeButton = container.querySelector("#goToHome");
    expect(homeButton).not.toBeNull();
    expect(homeButton.textContent).toBe("Home");
  });

  it("should log an error if the container does not exist", () => {
    const consoleSpy = vi.spyOn(console, "error");
    const navigation = new Navigation("nonExistentContainer");

    navigation.createHomeButton();

    expect(consoleSpy).toHaveBeenCalledWith(
      "Container with ID 'nonExistentContainer' not found."
    );
  });

  it("should navigate to '/' when the Home button is clicked", () => {
    const navigation = new Navigation("navContainer");
    navigation.createHomeButton();

    const homeButton = container.querySelector("#goToHome");

    const mockLocation = vi.spyOn(window.location, "pathname", "set");

    homeButton.click();

    expect(mockLocation).toHaveBeenCalledWith("/");
  });

  it("should clear the container and add navigation buttons in createNavbar", () => {
    const navigation = new Navigation("navContainer");
    navigation.createNavbar();

    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBe(2); 

    expect(buttons[0].textContent).toBe("Home");
    expect(buttons[1].textContent).toBe("Profile");
  });

  it("should navigate correctly when clicking the Profile button", () => {
    const navigation = new Navigation("navContainer");
    navigation.createNavbar();

    const profileButton = container.querySelector("button:nth-child(2)");

    const mockLocation = vi.spyOn(window.location, "pathname", "set");

    profileButton.click();

    expect(mockLocation).toHaveBeenCalledWith("/profile/");
  });
});
End of the original test*/

import { describe, it, expect, beforeEach, vi } from "vitest";
import { Navigation } from "../navigation";

describe("Navigation", () => {
  let container;

  beforeEach(() => {
    document.body.innerHTML = '<div id="navContainer"></div>';
    container = document.getElementById("navContainer");
  });

  it("should add a 'Home' button to the container", () => {
    const navigation = new Navigation("navContainer");
    navigation.createHomeButton();

    const homeButton = container.querySelector("#goToHome");
    expect(homeButton).not.toBeNull();
    expect(homeButton.textContent).toBe("Home");
  });

  it("should log an error if the container does not exist", () => {
    const consoleSpy = vi.spyOn(console, "error");
    const navigation = new Navigation("nonExistentContainer");
    navigation.createHomeButton();
    expect(consoleSpy).toHaveBeenCalledWith(
      "Container with ID 'nonExistentContainer' not found."
    );
  });

  it("should navigate to '/' when the Home button is clicked", () => {
    const navigation = new Navigation("navContainer");
    navigation.createHomeButton();

    const homeButton = container.querySelector("#goToHome");

    const mockLocation = { assign: vi.fn() };
    global.window.location = mockLocation; // Mock `window.location`

    homeButton.click();

    expect(mockLocation.assign).toHaveBeenCalledWith("/");
  });

  it("should clear the container and add navigation buttons in createNavbar", () => {
    const navigation = new Navigation("navContainer");
    navigation.createNavbar();

    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBe(2); // "Home" and "Profile" buttons
    expect(buttons[0].textContent).toBe("Home");
    expect(buttons[1].textContent).toBe("Profile");
  });

  it("should navigate correctly when clicking the Profile button", () => {
    const navigation = new Navigation("navContainer");
    navigation.createNavbar();

    const profileButton = container.querySelector("button:nth-child(2)");

    const mockLocation = { assign: vi.fn() };
    global.window.location = mockLocation; // Mock `window.location`

    profileButton.click();

    expect(mockLocation.assign).toHaveBeenCalledWith("/profile/");
  });
});
