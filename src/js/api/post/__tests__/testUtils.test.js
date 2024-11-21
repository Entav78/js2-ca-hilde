// testUtils.js
export const mockFetch = (mockResponse, ok = true) => {
  global.fetch = vi.fn().mockResolvedValueOnce({
    ok,
    json: async () => mockResponse,
  });
};

export const clearFetchMocks = () => {
  fetch.mockClear();
};
