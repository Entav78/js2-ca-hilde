import { PostService } from '../../api/postService.js';
import { PostsRenderer } from '../../ui/postsRenderer.js';

const postService = new PostService();

export async function initializeHomePage() {
  console.log('Fetching posts for the Home page...');

  const postsRenderer = new PostsRenderer('homeContainer');

  // Fetch public posts only
  await postsRenderer.init(() =>
    postService.readPosts({ includePrivate: false })
  );

  console.log('Home page initialized.');
}

// Initialize the home page when the DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initializeHomePage();
  });
} else {
  initializeHomePage();
}
