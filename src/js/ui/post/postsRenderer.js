/* Test for bootstrap

import { basePath } from "../../api/constants.js"; // Adjust the path as necessary

export class PostsRenderer {
  constructor(containerId) {
    this.containerId = containerId;
    this.container = null;
  }

  async init(fetchPostsFunction) {
    console.log("Initializing PostsRenderer...");
    this.container = document.getElementById(this.containerId);

    if (!this.container) {
      console.error(`Container with ID "${this.containerId}" not found.`);
      return;
    }

    console.log("homeContainer found:", this.container);

    try {
      const posts = await fetchPostsFunction();
const postList = posts?.data || posts; // Use posts.data if available

if (postList.length > 0) {
  this.renderPosts(postList);
} else {
  this.renderMessage("No posts available.");
}

    } catch (error) {
      this.renderMessage(`Error loading posts: ${error.message}`);
      console.error("Error fetching posts:", error);
    }
  }

  renderPosts(posts) {
    console.log("Rendering posts:", posts);
    this.container.innerHTML = ""; 

    posts.forEach((post) => {
      console.log("Rendering post:", post);
      const postElement = this.createPostElement(post);
      this.container.appendChild(postElement);
    });
  }

  createPostElement(post) {
    const postElement = document.createElement("div");
    postElement.className = "post";
  
    const titleElement = document.createElement("h2");
    titleElement.textContent = post.title;
    titleElement.addEventListener("click", () => {
      window.location.href = `${basePath}/post/?id=${post.id}`;
    });
  
    postElement.appendChild(titleElement);
    return postElement;
  }
  

  renderMessage(message) {
    this.container.innerHTML = `<p>${message}</p>`;
  }
}
End of test bootstrap*/

import { basePath } from '../../api/constants.js';

export class PostsRenderer {
  constructor(containerId) {
    this.containerId = containerId;
    this.container = null;
  }

  /**
   * Initializes the PostsRenderer by fetching and displaying posts
   * @param {Function} fetchPostsFunction - A function to fetch posts
   */
  async init(fetchPostsFunction) {
    console.log('Initializing PostsRenderer...');
    this.container = document.getElementById(this.containerId);

    if (!this.container) {
      console.error(`Container with ID "${this.containerId}" not found.`);
      return;
    }

    console.log('homeContainer found:', this.container);

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

    if (post.media?.url) {
      const thumbnail = document.createElement('img');
      thumbnail.src = post.media.url;
      thumbnail.alt = post.media.alt || 'Post Image';
      thumbnail.className = 'post-image';
      postElement.appendChild(thumbnail);
    }

    const content = document.createElement('div');
    content.className = 'post-content';

    const title = document.createElement('h3');
    title.textContent = post.title || 'Untitled Post';
    title.addEventListener('click', () => {
      window.location.href = `${basePath}/post/?id=${post.id}`;
    });

    const body = document.createElement('p');
    body.textContent =
      post.body && post.body.length > 100
        ? `${post.body.substring(0, 100)}...`
        : post.body || 'No content available.';

    const tags = document.createElement('div');
    tags.className = 'tags';
    tags.textContent = `Tags: ${post.tags?.join(', ') || 'No tags'}`;

    content.appendChild(title);
    content.appendChild(body);
    content.appendChild(tags);

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
