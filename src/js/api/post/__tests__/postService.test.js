/*old test
import { describe, it, expect, beforeEach } from "vitest";
import { PostService } from "../postService";
import { mockFetch, clearFetchMocks } from "./testUtils.test.js";

describe("PostService", () => {
  let postService;

  beforeEach(() => {
    clearFetchMocks(); // Ensure fetch is reset
    postService = new PostService("/api/post"); // Initialize PostService with a base URL
    localStorage.clear(); // Clear localStorage before each test
  });

  describe("createPost", () => {
    it("should create a post successfully when logged in", async () => {
      const mockResponse = { id: 1, title: "New Post" };
      mockFetch(mockResponse);

      // Mock localStorage token to simulate logged-in user
      localStorage.setItem("token", "mock-valid-token");

      const postData = { title: "New Post", body: "This is a new post." };
      const result = await postService.createPost(postData);

      expect(fetch).toHaveBeenCalledWith("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer mock-valid-token",
        },
        body: JSON.stringify(postData),
      });
      expect(result).toEqual(mockResponse);
    });

    it("should throw an error if not logged in", async () => {
      const postData = { title: "New Post" };

      await expect(postService.createPost(postData)).rejects.toThrow(
        "You must be logged in to create a post."
      );
    });

    it("should throw an error if API request fails", async () => {
      mockFetch(null, false); // Simulate a failed API response

      // Mock localStorage token to simulate logged-in user
      localStorage.setItem("token", "mock-valid-token");

      const postData = { title: "Failing Post" };

      await expect(postService.createPost(postData)).rejects.toThrow(
        "Failed to create post"
      );
      expect(fetch).toHaveBeenCalledWith("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer mock-valid-token",
        },
        body: JSON.stringify(postData),
      });
    });

    it("should throw an error if title is missing", async () => {
      const postData = { body: "Missing title" };

      await expect(postService.createPost(postData)).rejects.toThrow(
        "Title is required to create a post."
      );
    });
  });
});
end of old test*/

import { describe, it, expect, beforeEach } from "vitest";
import { PostService } from "../postService";
import { mockFetch, clearFetchMocks } from "./testUtils.test.js";

describe("PostService", () => {
  let postService;

  beforeEach(() => {
    clearFetchMocks();
    postService = new PostService("/api/post");
  });

  // Test createPost
  describe("createPost", () => {
    it("should successfully create a post", async () => {
      const mockResponse = { id: 1, title: "New Post" };
      mockFetch(mockResponse);

      const postData = { title: "New Post", body: "This is a new post." };
      const result = await postService.createPost(postData);

      expect(fetch).toHaveBeenCalledWith("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });
      expect(result).toEqual(mockResponse);
    });

    it("should throw an error if title is missing", async () => {
      const postData = { body: "No title" };

      await expect(postService.createPost(postData)).rejects.toThrow(
        "Title is required to create a post."
      );
    });
  });

  // Test updatePost
  describe("updatePost", () => {
    it("should successfully update a post", async () => {
      const mockResponse = { id: 1, title: "Updated Post" };
      mockFetch(mockResponse);

      const postData = { id: 1, title: "Updated Post", body: "Updated body" };
      const result = await postService.updatePost(postData.id, postData);

      expect(fetch).toHaveBeenCalledWith("/api/post/1", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });
      expect(result).toEqual(mockResponse);
    });

    it("should throw an error if post ID is missing", async () => {
      const postData = { title: "Missing ID" };

      await expect(postService.updatePost(null, postData)).rejects.toThrow(
        "Post ID is required to update a post."
      );
    });
  });

  // Test deletePost
  describe("deletePost", () => {
    it("should successfully delete a post", async () => {
      const mockResponse = { success: true };
      mockFetch(mockResponse);

      const postId = 1;
      const result = await postService.deletePost(postId);

      expect(fetch).toHaveBeenCalledWith("/api/post/1", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      expect(result).toEqual(mockResponse);
    });

    it("should throw an error if post ID is missing", async () => {
      await expect(postService.deletePost(null)).rejects.toThrow(
        "Post ID is required to delete a post."
      );
    });
  });

  // Test readPost
  describe("readPost", () => {
    it("should fetch a single post by ID", async () => {
      const mockResponse = { id: 1, title: "Test Post" };
      mockFetch(mockResponse);

      const result = await postService.readPost(1);

      expect(fetch).toHaveBeenCalledWith("/api/post/1", { method: "GET" });
      expect(result).toEqual(mockResponse);
    });
  });

  // Test readPosts
  describe("readPosts", () => {
    it("should fetch multiple posts", async () => {
      const mockResponse = [
        { id: 1, title: "Post 1" },
        { id: 2, title: "Post 2" },
      ];
      mockFetch(mockResponse);

      const result = await postService.readPosts();

      expect(fetch).toHaveBeenCalledWith("/api/post?limit=12&page=1", {
        method: "GET",
      });
      expect(result).toEqual(mockResponse);
    });
  });
});

