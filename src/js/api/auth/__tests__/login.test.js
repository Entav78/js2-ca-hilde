import { describe, it, expect, vi } from "vitest";
import { Login } from "../login";

global.fetch = vi.fn();

describe("Login", () => {
  it("should return a user object when email and password are provided", async () => {
    const mockResponse = {
      token: "123abc",
      user: { email: "test@example.com" },
    };
    fetch.mockResolvedValueOnce({
      json: async () => mockResponse,
      ok: true,
    });

    const loginInstance = new Login(); 
    const result = await loginInstance.login({
      email: "test@example.com",
      password: "password",
    });
    expect(result).toEqual(mockResponse);
  });

  it("should throw an error for an invalid login", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ message: "Invalid credentials" }),
    });

    const loginInstance = new Login();
    await expect(
      loginInstance.login({ email: "wrong@example.com", password: "wrongpassword" })
    ).rejects.toThrow();
  });
});
