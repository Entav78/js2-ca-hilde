export class PostService {
  constructor(baseURL = "/api/post") {
    this.baseURL = baseURL;
  }

   /**
   * Creates a new post by sending the data to the API.
   * @param {Object} data - The post parameters.
   * @param {string} data.title - The title of the post (required).
   * @param {string} [data.body] - The body of the post (optional).
   * @param {string[]} [data.tags] - Array of tags associated with the post (optional).
   * @param {Object} [data.media] - Media object containing URL and alt text (optional).
   * @returns {Promise<Object>} The created post data from the API.
   * @throws {Error} If the API request fails.
   */

   async createPost(data) {
    if (!data || !data.title) throw new Error("Title is required to create a post.");

    try {
      const response = await fetch(this.baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error(`Failed to create post: ${response.statusText}`);

      return await response.json();
    } catch (error) {
      console.error("Error in createPost:", error);
      throw error;
    }
  }

  /**
   * Reads a single post by its ID.
   * @param {string|number} id - The ID of the post to read.
   * @returns {Promise<object>} The response data.
   * @throws {Error} If the API request fails.
   */
  async readPost(id) {
    if (!id) throw new Error("Post ID is required.");

    try {
      const response = await fetch(`${this.baseURL}/${id}`);
      if (!response.ok) throw new Error(`Failed to fetch post: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("Error in readPost:", error);
      throw error;
    }
  }

  /**
   * Reads multiple posts with optional pagination and tagging.
   * @param {number} [limit=12] - The maximum number of posts to return.
   * @param {number} [page=1] - The page number for pagination.
   * @param {string} [tag] - An optional tag to filter posts.
   * @returns {Promise<Object>} An object containing posts and meta info.
   * @throws {Error} If the API request fails.
   */
  async readPosts(limit = 12, page = 1, tag = "") {
    try {
      const params = new URLSearchParams({
        limit,
        page,
        ...(tag && { tag }),
      });
      const response = await fetch(`${this.baseURL}?${params.toString()}`);
      if (!response.ok) throw new Error(`Failed to fetch posts: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("Error in readPosts:", error);
      throw error;
    }
  }

  /**
   * Reads posts by a specific user with optional pagination and tagging.
   * @param {string} username - The username of the user whose posts to read.
   * @param {number} [limit=12] - The maximum number of posts to return.
   * @param {number} [page=1] - The page number for pagination.
   * @param {string} [tag] - An optional tag to filter posts.
   * @returns {Promise<Object>} An object containing posts and meta info.
   * @throws {Error} If the API request fails.
   */
  async readPostsByUser(username, limit = 12, page = 1, tag = "") {
    if (!username) throw new Error("Username is required.");

    try {
      const params = new URLSearchParams({
        limit,
        page,
        ...(tag && { tag }),
      });
      const response = await fetch(`${this.baseURL}?user=${username}&${params.toString()}`);
      if (!response.ok) throw new Error(`Failed to fetch posts by user: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("Error in readPostsByUser:", error);
      throw error;
    }
  }
}

  

  

