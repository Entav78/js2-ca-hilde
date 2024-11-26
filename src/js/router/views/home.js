/*import { PostService } from "../../api/post/postService";
import { PostsRenderer } from "../../ui/post/postsRenderer";
import { Navigation } from "../../ui/global/navigation";

document.addEventListener("DOMContentLoaded", async () => {
  console.log("Home page is running...");
  const navigationContainer = document.querySelector(".navigation-container");
  
  if (!navigationContainer) {
    console.error("Navigation container not found on the page.");
    return;
  }

  const isLoggedIn = !!localStorage.getItem("token");

  const nav = new Navigation(navigationContainer); 
  nav.createNavbar(isLoggedIn);

  const postService = new PostService();
  const postsRenderer = new PostsRenderer("homeContainer"); // Assuming 'homeContainer' is a valid ID for posts

  postsRenderer.init(async () => await postService.readPosts(10, 1, "example-tag"));
});
testing new home.js*/

/*
import { PostService } from "../../api/post/postService";
import { PostsRenderer } from "../../ui/post/postsRenderer";
import { Navigation } from "../../ui/global/navigation";

document.addEventListener("DOMContentLoaded", async () => {
  console.log("Home page is running...");
  
  const navigationContainer = document.querySelector(".navigation-container");
  console.log("Navigation container found:", navigationContainer);

  if (navigationContainer) {
    const isLoggedIn = !!localStorage.getItem("token");
    const navigation = new Navigation(navigationContainer);
    navigation.createNavbar(isLoggedIn);
    console.log("Navigation setup completed.");
  } else {
    console.error("Navigation container not found.");
  }

  const postService = new PostService();
  const postsRenderer = new PostsRenderer("homeContainer");

  postsRenderer.init(async () => await postService.readPosts(10, 1, "example-tag"));
});

more debugging testing DOM*/

import { Navigation } from "../../ui/global/navigation";

console.log("Running home page...");

function initializeNavigation() {
  const navigationContainer = document.querySelector(".navigation-container");
  console.log("Navigation container found:", navigationContainer);

  if (navigationContainer) {
    const isLoggedIn = !!localStorage.getItem("token");
    const nav = new Navigation(navigationContainer);
    console.log("Is user logged in:", isLoggedIn);
    nav.createNavbar(isLoggedIn, { includeHomeButton: false }); // Exclude the Home button on the home page
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

// Comment out PostService and PostsRenderer temporarily for debugging
// const postService = new PostService();
// const postsRenderer = new PostsRenderer("homeContainer"); // Assuming 'homeContainer' is a valid ID or class
// postsRenderer.init(async () => await postService.readPosts(10, 1, "example-tag"));

