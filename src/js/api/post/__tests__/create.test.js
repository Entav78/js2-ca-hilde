import { describe, it, expect, beforeEach } from "vitest";
import { PostService } from "../postService";
import { mockFetch, clearFetchMocks } from "./testUtils.test.js";

describe("PostService - createPost", () => {
  let postService;

  beforeEach(() => {
    clearFetchMocks();
    postService = new PostService();
  });

  it("should create a post with required title and default optional fields", async () => {
    const mockResponse = { id: 1, title: "Test Post" };
    mockFetch(mockResponse); // Using testUtils to mock fetch

    const postData = { title: "Test Post" };

    const result = await postService.createPost(postData);

    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
  });

  it("should throw an error if API request fails", async () => {
    mockFetch({ message: "Server Error" }, false); // Mocking failed fetch

    const postData = { title: "Failing Post" };

    await expect(postService.createPost(postData)).rejects.toThrow(
      "Failed to create post: Server Error"
    );
    expect(fetch).toHaveBeenCalledWith("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
  });
});

