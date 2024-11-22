import { describe, it, expect, beforeEach } from "vitest";
import { PostService } from "../postService";
import { mockFetch, clearFetchMocks } from "./testUtils.test.js"; // Use your mock utilities

describe("PostService", () => {
  let postService;

  beforeEach(() => {
    clearFetchMocks(); // Ensure fetch is reset
    postService = new PostService("/api/post"); // Initialize PostService with a base URL
  });

  describe("readPost", () => {
    it("should fetch a single post by ID", async () => {
      const mockResponse = { id: 1, title: "Test Post" };
      mockFetch(mockResponse);

      const result = await postService.readPost(1);

      expect(fetch).toHaveBeenCalledWith("/api/post/1");
      expect(result).toEqual(mockResponse);
    });

    it("should throw an error if no ID is provided", async () => {
      await expect(postService.readPost()).rejects.toThrow("Post ID is required.");
    });

    it("should throw an error if API request fails", async () => {
      mockFetch(null, false);

      await expect(postService.readPost(999)).rejects.toThrow("Failed to fetch post");
    });
  });

  describe("readPosts", () => {
    it("should fetch multiple posts with default parameters", async () => {
      const mockResponse = [{ id: 1, title: "Post 1" }, { id: 2, title: "Post 2" }];
      mockFetch(mockResponse);

      const result = await postService.readPosts();

      expect(fetch).toHaveBeenCalledWith("/api/post?limit=12&page=1");
      expect(result).toEqual(mockResponse);
    });

    it("should fetch posts with custom parameters", async () => {
      const mockResponse = [{ id: 3, title: "Custom Post" }];
      mockFetch(mockResponse);

      const result = await postService.readPosts(5, 2, "customTag");

      expect(fetch).toHaveBeenCalledWith("/api/post?limit=5&page=2&tag=customTag");
      expect(result).toEqual(mockResponse);
    });

    it("should throw an error if API request fails", async () => {
      mockFetch(null, false);

      await expect(postService.readPosts()).rejects.toThrow("Failed to fetch posts");
    });
  });

  describe("readPostsByUser", () => {
    it("should fetch posts by username", async () => {
      const mockResponse = [{ id: 1, title: "User Post" }];
      mockFetch(mockResponse);

      const result = await postService.readPostsByUser("testUser");

      expect(fetch).toHaveBeenCalledWith("/api/post?user=testUser&limit=12&page=1");
      expect(result).toEqual(mockResponse);
    });

    it("should throw an error if no username is provided", async () => {
      await expect(postService.readPostsByUser()).rejects.toThrow("Username is required.");
    });

    it("should throw an error if API request fails", async () => {
      mockFetch(null, false);

      await expect(postService.readPostsByUser("nonExistentUser")).rejects.toThrow(
        "Failed to fetch posts by user"
      );
    });
  });

  describe("createPost", () => {
    it("should create a post successfully", async () => {
      const mockResponse = { id: 1, title: "New Post" };
      mockFetch(mockResponse);

      const postData = { title: "New Post", body: "This is a new post." };
      const result = await postService.createPost(postData);

      expect(fetch).toHaveBeenCalledWith("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      expect(result).toEqual(mockResponse);
    });

    it("should throw an error if API request fails", async () => {
      mockFetch(null, false);

      const postData = { title: "Failing Post" };

      await expect(postService.createPost(postData)).rejects.toThrow("Failed to create post");
    });

    it("should throw an error if title is missing", async () => {
      const postData = { body: "Missing title" };

      await expect(postService.createPost(postData)).rejects.toThrow(
        "Title is required to create a post."
      );
    });
  });
});

