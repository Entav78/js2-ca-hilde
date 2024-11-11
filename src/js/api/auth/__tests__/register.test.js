import { describe, it, expect, vi } from "vitest";
import { Register } from "../register.js";

global.fetch = vi.fn();

describe("Register Class", () => {
  it("should return a user object when registration is successful", async () => {
    const mockResponse = {
      name: "test user",
      email: "test@example.com",
      bio: "This is a test user.",
      avatar: {
        url: "https://example.com/avatar.jpg",
        alt: "My avatar alt text",
      },
      banner: {
        url: "https://example.com/banner.jpg",
        alt: "My banner alt text",
      },
    };

    fetch.mockResolvedValueOnce({
      json: async () => mockResponse,
      ok: true,
    });

    const registerInstance = new Register(API_AUTH_REGISTER);
    const result = await registerInstance.register({
      name: "Test user",
      email: "test@stud.noroff.no",
      password: "password",
      bio: "This is a test user.",
      avatar: {
        url: "https://example.com/avatar.jpg",
        alt: "My avatar alt text",
      },
      banner: {
        url: "https://example.com/banner.jpg",
        alt: "My banner alt text",
      },
    });

    expect(result).toEqual(mockResponse);
  });

  it("should throw an error when registration fails", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ message: "Registration failed" }),
    });

    const registerInstance = new Register(API_AUTH_REGISTER);

    await expect(
      registerInstance.register({
        name: "Test User",
        email: "test@example.com",
        password: "password",
      })
    ).rejects.toThrow();
  });
});

