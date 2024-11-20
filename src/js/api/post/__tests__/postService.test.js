import { describe, it, expect, vi, beforeEach } from "vitest";
import { PostService } from "../postService"; // Adjust the path to your PostService file

global.fetch = vi.fn();

describe("PostService", () => {
  let postService;

  beforeEach(() => {
    fetch.mockClear(); // Reset mock between tests
    postService = new PostService("/api/post"); // Initialize PostService with a base URL
  });

  describe("readPost", () => {
    it("should fetch a single post by ID", async () => {
      const mockResponse = { id: 1, title: "Test Post" };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await postService.readPost(1);

      expect(fetch).toHaveBeenCalledWith("/api/posts/1");
      expect(result).toEqual(mockResponse);
    });

    it("should throw an error if no ID is provided", async () => {
      await expect(postService.readPost()).rejects.toThrow("Post ID is required.");
    });

    it("should throw an error if API request fails", async () => {
      fetch.mockResolvedValueOnce({ ok: false, statusText: "Not Found" });

      await expect(postService.readPost(999)).rejects.toThrow("Failed to fetch post: Not Found");
    });
  });

  describe("readPosts", () => {
    it("should fetch multiple posts with default parameters", async () => {
      const mockResponse = [{ id: 1, title: "Post 1" }, { id: 2, title: "Post 2" }];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await postService.readPosts();

      expect(fetch).toHaveBeenCalledWith("/api/posts?limit=12&page=1");
      expect(result).toEqual(mockResponse);
    });

    it("should fetch posts with custom parameters", async () => {
      const mockResponse = [{ id: 3, title: "Custom Post" }];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await postService.readPosts(5, 2, "customTag");

      expect(fetch).toHaveBeenCalledWith("/api/posts?limit=5&page=2&tag=customTag");
      expect(result).toEqual(mockResponse);
    });

    it("should throw an error if API request fails", async () => {
      fetch.mockResolvedValueOnce({ ok: false, statusText: "Server Error" });

      await expect(postService.readPosts()).rejects.toThrow("Failed to fetch posts: Server Error");
    });
  });

  describe("readPostsByUser", () => {
    it("should fetch posts by username", async () => {
      const mockResponse = [{ id: 1, title: "User Post" }];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await postService.readPostsByUser("testUser");

      expect(fetch).toHaveBeenCalledWith("/api/posts?user=testUser&limit=12&page=1");
      expect(result).toEqual(mockResponse);
    });

    it("should throw an error if no username is provided", async () => {
      await expect(postService.readPostsByUser()).rejects.toThrow("Username is required.");
    });

    it("should throw an error if API request fails", async () => {
      fetch.mockResolvedValueOnce({ ok: false, statusText: "Not Found" });

      await expect(postService.readPostsByUser("nonExistentUser")).rejects.toThrow(
        "Failed to fetch posts by user: Not Found"
      );
    });
  });
});
