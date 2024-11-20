import { PostsRenderer } from "../../ui/post/postsRenderer";
import { fetchPosts } from "../../api/post/read";
import { authGuard } from "../../utilities/authGuard";

authGuard();

document.addEventListener("DOMContentLoaded", () => {
  const postsRenderer = new PostsRenderer("homeContainer");
  postsRenderer.init(fetchPosts);
});

