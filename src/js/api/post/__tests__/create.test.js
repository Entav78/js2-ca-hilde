import { describe, it, expect, vi, beforeEach } from "vitest";
import { PostService } from "../postService";

global.fetch = vi.fn();

describe("PostService - createPost", () => {
  let postService;

  beforeEach(() => {
    fetch.mockClear();
    postService = new PostService();
  });

  it("should create a post with required title and default optional fields", async () => {
    const mockResponse = { id: 1, title: "Test Post" };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const postData = { title: "Test Post" };

    const result = await postService.createPost(postData);

    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
  });

  it("should throw an error if API request fails", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: "Server Error",
    });

    const postData = { title: "Failing Post" };

    await expect(postService.createPost(postData)).rejects.toThrow(
      "Failed to create post: Server Error"
    );
    expect(fetch).toHaveBeenCalledWith("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
  });
});

