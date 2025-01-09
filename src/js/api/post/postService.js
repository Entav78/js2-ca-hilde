import { API_SOCIAL_POSTS, API_KEY } from '../constants.js';

import { headers } from '../headers.js';

export class PostService {
  constructor(baseURL = API_SOCIAL_POSTS) {
    this.baseURL = baseURL;
  }

  /**
   * Handles post actions (create, update, delete).
   * @param {string} action - The action to perform ("create", "update", "delete").
   * @param {Object} [data=null] - The post data for create/update actions.
   * @param {string} [postId=null] - The post ID for update/delete actions.
   * @returns {Promise<Object>} The server's response.
   * @throws {Error} If the action fails or the token is invalid/missing.
   */
  /**
   * Reads multiple posts with optional pagination.
   * @param {number} [limit=12] - The maximum number of posts to fetch.
   * @param {number} [page=1] - The page number for pagination.
   * @returns {Promise<Object>} The fetched posts' data.
   */
  async handlePost(action, data = null, postId = null) {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken || accessToken === 'undefined') {
      throw new Error('Invalid or missing accessToken. Please log in again.');
    }

    let url = this.baseURL;
    let method = 'POST';

    if (action === 'update' && postId) {
      url += `/${postId}`;
      method = 'PUT';
    } else if (action === 'delete' && postId) {
      url += `/${postId}`;
      method = 'DELETE';
    } else if (action !== 'create') {
      throw new Error('Invalid action or missing postId.');
    }

    try {
      const requestHeaders = headers(accessToken); // Use the headers function
      console.log('Headers in request:', [...requestHeaders.entries()]);

      const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: action === 'delete' ? null : JSON.stringify(data),
      });

      if (!response.ok) {
        console.error('Error response from server:', response);
        throw new Error(`Failed to ${action} post: ${response.statusText}`);
      }

      return action === 'delete'
        ? { message: 'Post deleted successfully' }
        : await response.json();
    } catch (error) {
      console.error(`Error during ${action} post:`, error);
      throw error;
    }
  }

  /**
   * Creates a new post with the logged-in user's name set as the author.
   * @param {Object} data - The post data.
   * @returns {Promise<Object>} The created post's data.
   * @throws {Error} If the title is missing or user details are not found.
   */
  async createPost(data) {
    // Retrieve the currently logged-in user's details
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (!userDetails || !userDetails.name) {
      throw new Error('User details not found. Please log in again.');
    }

    // Automatically set the author to the logged-in user's name
    const postData = {
      ...data,
      author: userDetails.name,
    };

    if (!postData.title) throw new Error('Title is required to create a post.');
    return this.handlePost('create', postData);
  }

  /**
   * Updates an existing post.
   * @param {string} postId - The ID of the post to update.
   * @param {Object} data - The post data to update.
   * @returns {Promise<Object>} The updated post's data.
   */
  async updatePost(postId, data) {
    if (!postId) throw new Error('Post ID is required to update a post.');
    return this.handlePost('update', data, postId);
  }

  /**
   * Deletes a post.
   * @param {string} postId - The ID of the post to delete.
   * @returns {Promise<Object>} A success message.
   */
  async deletePost(postId) {
    if (!postId) throw new Error('Post ID is required to delete a post.');
    return this.handlePost('delete', null, postId);
  }

  /**
   * Reads a single post by ID.
   * @param {string} postId - The ID of the post to fetch.
   * @returns {Promise<Object>} The post's data.
   */
  async readPost(postId) {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken || accessToken === 'undefined') {
      throw new Error('Invalid or missing accessToken. Please log in again.');
    }

    const response = await fetch(`${this.baseURL}/${postId}`, {
      headers: headers(accessToken), // Pass the token to headers
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Fetches all posts (publicly accessible or requiring authentication).
   * @param {boolean} includePrivate - Whether to include private posts (requires authentication).
   * @returns {Promise<Array>} - A promise resolving to the list of posts.
   */
  /**
   * Reads multiple posts with optional pagination.
   * @param {number} [limit=12] - The maximum number of posts to fetch.
   * @param {number} [page=1] - The page number for pagination.
   * @returns {Promise<Object>} The fetched posts' data.
   */
  async readPosts({ limit = 12, page = 1, includePrivate = false } = {}) {
    // Use the correct headers based on whether private posts are included
    const headersObject = includePrivate
      ? headers() // Use full authentication headers
      : new Headers({
          'Content-Type': 'application/json',
          'X-Noroff-API-Key': API_KEY, // Publicly accessible headers
        });

    // Add pagination parameters to the URL
    const params = new URLSearchParams({ limit, page });
    const url = `${
      this.baseURL
    }?${params.toString()}&_author=true&_comments=true&_reactions=true`;

    try {
      console.log('Fetching posts from URL:', url);
      console.log('Using headers:', [...headersObject.entries()]);

      const response = await fetch(url, {
        headers: headersObject,
      });

      if (!response.ok) {
        console.error('Failed to fetch posts:', response);
        throw new Error(`Failed to fetch posts: ${response.status}`);
      }

      const data = await response.json();
      console.log('Posts fetched:', data);
      return data;
    } catch (error) {
      console.error('Error fetching posts:', error.message);
      throw error;
    }
  }
}
