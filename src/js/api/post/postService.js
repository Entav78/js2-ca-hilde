
import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";
export class PostService {
  constructor(baseURL = API_SOCIAL_POSTS) {
    this.baseURL = baseURL;
  }

  /**
   * Retrieves and validates the token from localStorage.
   * @returns {string} The valid token.
   * @throws {Error} If the token is invalid or missing.
   */
  
    async handlePost(action, data = null, postId = null) {
    const token = localStorage.getItem("token");
    if (!token || token === "undefined") {
      throw new Error("Invalid or missing token. Please log in again.");
    }

    let url = this.baseURL;
    let method = "POST";

    if (action === "update" && postId) {
      url += `/${postId}`;
      method = "PUT";
    } else if (action === "delete" && postId) {
      url += `/${postId}`;
      method = "DELETE";
    } else if (action !== "create") {
      throw new Error("Invalid action or missing postId.");
    }

    try {
      const requestHeaders = headers(token); // Use the headers function
      console.log("Headers in request:", [...requestHeaders.entries()]); // Log headers to debug

      const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: action === "delete" ? null : JSON.stringify(data),
      });

      if (!response.ok) {
        console.error("Error response from server:", response);
        throw new Error(`Failed to ${action} post: ${response.statusText}`);
      }

      return action === "delete" 
        ? { message: "Post deleted successfully" } 
        : await response.json();
    } catch (error) {
      console.error(`Error during ${action} post:`, error);
      throw error;
    }
  }



  async createPost(data) {
    if (!data?.title) throw new Error("Title is required to create a post.");
    return this.handlePost("create", data);
  }

  async updatePost(postId, data) {
    if (!postId) throw new Error("Post ID is required to update a post.");
    return this.handlePost("update", data, postId);
  }

  async deletePost(postId) {
    if (!postId) throw new Error("Post ID is required to delete a post.");
    return this.handlePost("delete", null, postId);
  }

  async readPost(postId) {
    if (!postId) throw new Error("Post ID is required to fetch a post.");
    const response = await fetch(`${this.baseURL}/${postId}`);
    if (!response.ok) throw new Error(`Failed to fetch post: ${response.statusText}`);
    return response.json();
  }
  
  async readPosts(limit = 12, page = 1) {
    const params = new URLSearchParams({ limit, page });
    const response = await fetch(`${this.baseURL}?${params.toString()}`);
    if (!response.ok) throw new Error(`Failed to fetch posts: ${response.statusText}`);
    return response.json();
  }

}


  

  

