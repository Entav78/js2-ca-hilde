/*import { onLogout } from "../logout";*/
import { describe, test, expect, beforeEach, vi } from "vitest";
import router from "../../../router";

vi.mock("../../../router", () => ({
  default: vi.fn(),
}));

describe("onLogout", () => {
  beforeEach(() => {
    // Mock alert
    global.alert = vi.fn();

    // Mock localStorage
    const localStorageMock = (() => {
      let store = {};
      return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => (store[key] = value),
        removeItem: (key) => delete store[key],
        clear: () => (store = {}),
      };
    })();

    global.localStorage = localStorageMock; // Replace global.localStorage with mock
    localStorage.clear(); // Clear any previous data in mock
  });

  afterEach(() => {
    // Clean up mocks after each test
    vi.restoreAllMocks();
  });

  it("should remove token from localStorage and navigate to login", () => {
    // Set a token in localStorage
    localStorage.setItem("token", "mockToken");

    // Call the onLogout function
    onLogout();

    // Assertions
    expect(localStorage.getItem("token")).toBeNull(); // Token should be removed
    expect(global.alert).toHaveBeenCalledWith("Logged out successfully"); // Check alert call
  });
});

