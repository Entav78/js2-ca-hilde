import { PostService } from '../../api/post/postService.js';
import { PostsRenderer } from '../../ui/post/postsRenderer.js';

const postService = new PostService();

export async function initializeHomePage() {
  const isLoggedIn = !!localStorage.getItem('accessToken'); // Check login status
  console.log('Initializing Home page...');
  console.log('User logged in:', isLoggedIn);

  const postsRenderer = new PostsRenderer('homeContainer');

  try {
    // Fetch posts based on login status
    await postsRenderer.init(() =>
      postService.readPosts({
        limit: 10,
        page: 1,
        includePrivate: isLoggedIn, // Include private posts if logged in
      })
    );
    console.log('Home page initialized successfully.');
  } catch (error) {
    console.error('Error initializing Home page:', error.message);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initializeHomePage();
  });
} else {
  initializeHomePage();
}
