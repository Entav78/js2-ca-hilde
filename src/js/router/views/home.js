
import { Navigation } from "../../ui/global/navigation";
import { PostService } from "../../api/post/postService";
import { PostsRenderer} from "../../ui/post/postsRenderer"

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

// Check if the DOM is already loaded
if (document.readyState === "loading") {
  // If the DOM is still loading, wait for it to fully load
  document.addEventListener("DOMContentLoaded", initializeNavigation);
} else {
  // If the DOM is already loaded, run the initialization immediately
  initializeNavigation();
}

const postService = new PostService();
const postsRenderer = new PostsRenderer("homeContainer");

postsRenderer.init(async () => {
  console.log("Fetching from PostService...");
  return await postService.readPosts(10, 1);
});


