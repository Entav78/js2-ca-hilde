import { headers } from '../headers.js';

export class Profile {
  constructor(baseApiUrl = 'https://v2.api.noroff.dev/social/profiles') {
    this.baseApiUrl = baseApiUrl;
  }

  /**
   * Fetches a specific profile with optional posts.
   * @param {string} username - The username to fetch the profile for.
   * @param {boolean} includePosts - Whether to include posts in the response.
   * @returns {Promise<Object>} - The profile data.
   */
  async getProfile(username, includePosts = false) {
    if (!username) {
      throw new Error('Username is required to fetch a profile.');
    }

    const apiUrl = `${this.baseApiUrl}/${username}?_posts=${includePosts}`;
    console.log('Fetching from API URL:', apiUrl);

    try {
      const requestHeaders = headers();
      console.log('Headers being sent:', {
        'Content-Type': requestHeaders.get('Content-Type'),
        Authorization: requestHeaders.get('Authorization'),
      });

      const response = await fetch(apiUrl, { headers: requestHeaders });
      if (!response.ok) {
        console.error('API response status:', response.status);
        throw new Error(`Failed to fetch profile data: ${response.status}`);
      }

      const data = await response.json();
      console.log('Profile data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching profile data:', error.message);
      throw error;
    }
  }

  /**
   * Fetches a paginated list of profiles.
   * @param {number} [limit=10] - The number of profiles to fetch per page.
   * @param {number} [page=1] - The page number to fetch.
   * @returns {Promise<Object>} - The profiles data.
   */
  async getProfiles(limit = 10, page = 1) {
    const apiUrl = `${this.baseApiUrl}?limit=${limit}&page=${page}`;

    try {
      const response = await fetch(apiUrl, { headers: headers() });
      if (!response.ok) {
        throw new Error('Failed to fetch profiles');
      }

      const data = await response.json();
      console.log('Profiles data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching profiles:', error.message);
      throw error;
    }
  }
}
