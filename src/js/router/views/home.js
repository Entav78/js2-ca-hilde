import { PostService } from "../../api/post/postService";
import { PostsRenderer } from "../../ui/post/postsRenderer";
import { authGuard } from "../../utilities/authGuard";

authGuard();

document.addEventListener("DOMContentLoaded", async () => {
  const postService = new PostService();
  const postsRenderer = new PostsRenderer("homeContainer");

  postsRenderer.init(async () => await postService.readPosts(10, 1, "example-tag")); // Example of fetching posts with tag
});


