import { PostService } from '../../api/post/postService.js';
import { PostsRenderer } from '../../ui/post/postsRenderer.js';

function initializePostsRenderer() {
  const postService = new PostService();
  const postsRenderer = new PostsRenderer('post-container'); // Assuming 'homeContainer' is the correct ID

  console.log('Fetching from PostService...');
  postsRenderer.init(async () => await postService.readPosts(10, 1));
}

// Initialize posts renderer when the DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initializePostsRenderer();
  });
} else {
  initializePostsRenderer();
}
