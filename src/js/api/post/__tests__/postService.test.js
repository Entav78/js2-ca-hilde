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


