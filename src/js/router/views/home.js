import { PostService } from "../../api/post/postService";
import { PostsRenderer } from "../../ui/post/postsRenderer";
import { Navigation } from "../../ui/global/navigation";

document.addEventListener("DOMContentLoaded", async () => {
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



