import { vi } from "vitest";

export const mockFetch = (mockResponse, ok = true) => {
  global.fetch = vi.fn().mockResolvedValueOnce({
    ok,
    json: async () => mockResponse,
  });
};

export const clearFetchMocks = () => {
  if (fetch && fetch.mockClear) {
    fetch.mockClear();
  }
};
