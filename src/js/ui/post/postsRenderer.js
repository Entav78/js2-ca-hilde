import { basePath } from '../../api/constants.js';

export class PostsRenderer {
  constructor(containerClass) {
    this.containerClass = containerClass; // Save the container class
    this.container = null;
  }

  /**
   * Initializes the PostsRenderer by fetching and displaying posts
   * @param {Function} fetchPostsFunction - A function to fetch posts
   */
  async init(fetchPostsFunction) {
    console.log('Initializing PostsRenderer...');
    this.container = document.querySelector(`.${this.containerClass}`);

    if (!this.container) {
      console.error(`Container with class "${this.containerClass}" not found.`);
      return;
    }

    console.log('Container found:', this.container);

    try {
      const posts = await fetchPostsFunction();
      const postList = posts?.data || posts; // Use posts.data if available

      if (postList.length > 0) {
        this.renderPosts(postList);
      } else {
        this.renderMessage('No posts available.');
      }
    } catch (error) {
      this.renderMessage(`Error loading posts: ${error.message}`);
      console.error('Error fetching posts:', error);
    }
  }

  /**
   * Renders the list of posts
   * @param {Array} posts - List of posts
   */
  renderPosts(posts) {
    console.log('Rendering posts:', posts);
    this.container.innerHTML = '';

    const postList = document.createElement('div');
    postList.className = 'post-list';

    posts.forEach((post) => {
      console.log('Rendering post:', post);
      const postElement = this.createPostElement(post);
      postList.appendChild(postElement);
    });

    this.container.appendChild(postList);
  }

  /**
   * Creates an individual post element
   * @param {Object} post - Post data
   * @returns {HTMLElement} - The post element
   */
  createPostElement(post) {
    const postElement = document.createElement('div');
    postElement.className = 'post-card';

    // Add post image if available
    if (post.media?.url) {
      const thumbnail = document.createElement('img');
      thumbnail.src = post.media.url;
      thumbnail.alt = post.media.alt || 'Post Image';
      thumbnail.className = 'post-image';
      postElement.appendChild(thumbnail);
    }

    // Create the content wrapper
    const content = document.createElement('div');
    content.className = 'post-content';

    // Add post title
    const title = document.createElement('h3');
    title.className = 'post-title';
    title.textContent = post.title || 'Untitled Post';
    title.addEventListener('click', () => {
      window.location.href = `${basePath}/post/?id=${post.id}`;
    });

    // Add post body
    const body = document.createElement('p');
    body.className = 'post-body';
    body.textContent =
      post.body && post.body.length > 100
        ? `${post.body.substring(0, 100)}...`
        : post.body || 'No content available.';

    // Add tags
    const tags = document.createElement('div');
    tags.className = 'post-tags';
    tags.textContent = `Tags: ${post.tags?.join(', ') || 'No tags'}`;

    // Append elements to content container
    content.appendChild(title);
    content.appendChild(body);
    content.appendChild(tags);

    // Append content to post card
    postElement.appendChild(content);
    return postElement;
  }

  /**
   * Renders a message in the container
   * @param {string} message - Message to display
   */
  renderMessage(message) {
    this.container.innerHTML = `<p>${message}</p>`;
  }
}
