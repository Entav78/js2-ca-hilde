import { Navigation } from "../../ui/global/navigation";
import { PostService } from "../../api/post/postService";
import { PostsRenderer } from "../../ui/post/postsRenderer";

function initializeNavigation() {
  const navContainer = document.querySelector(".navigation-container");
  console.log("Navigation container found:", navContainer);

  if (navContainer) {
    const isLoggedIn = !!localStorage.getItem("token");
    const nav = new Navigation(navContainer);
    console.log("Is user logged in:", isLoggedIn);
    nav.createNavbar(isLoggedIn, { 
      includeHomeButton: false,
      includeCreatePostButton: isLoggedIn,
    }); 
    console.log("Navigation setup completed.");
  } else {
    console.error("Navigation container not found.");
  }
}

function initializePostsRenderer() {
  const postService = new PostService();
  const postsRenderer = new PostsRenderer("homeContainer"); // Assuming 'homeContainer' is the correct ID

  console.log("Fetching from PostService...");
  postsRenderer.init(async () => await postService.readPosts(10, 1));
}

// Initialize navigation and posts renderer when the DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initializeNavigation();
    initializePostsRenderer();
  });
} else {
  initializeNavigation();
  initializePostsRenderer();
}




