import { PostService } from '../../api/post/postService.js';
import { PostsRenderer } from '../../ui/post/postsRenderer.js';

const postService = new PostService();

export async function initializeHomePage() {
  console.log('Initializing Home page with public posts...');

  const postsRenderer = new PostsRenderer('homeContainer');

  try {
    await postsRenderer.init(() =>
      postService.readPosts({ limit: 10, page: 1, includePrivate: false })
    );
    console.log('Home page initialized successfully.');
  } catch (error) {
    console.error('Error initializing home page:', error);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initializeHomePage();
  });
} else {
  initializeHomePage();
}
