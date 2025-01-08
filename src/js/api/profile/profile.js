import { headers } from '../headers.js';

console.log('Headers for API call:', headers());
export class Profile {
  constructor(baseApiUrl = 'https://v2.api.noroff.dev/social/profiles') {
    this.baseApiUrl = baseApiUrl;
  }

  /**
   * Fetches a specific profile or the logged-in user's profile.
   * @param {boolean} [includePosts] - Whether to include posts in the response (default: false).
   * @returns {Promise<Object>} - The profile data.
   */
  async getProfile(includePosts = false) {
    const accessToken = localStorage.getItem('accessToken');
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));

    console.log('Access token:', accessToken);
    console.log('User details:', userDetails);

    if (!accessToken) {
      throw new Error(
        'Authentication error: Access token is missing. Please log in again.'
      );
    }

    const username = userDetails?.name;
    if (!username) {
      throw new Error(
        'User details are missing or incomplete. Please log in again.'
      );
    }

    const apiUrl = `${this.baseApiUrl}/${username}?_posts=${includePosts}`;
    console.log('Fetching from API URL:', apiUrl);

    try {
      const requestHeaders = headers(accessToken);
      console.log('Headers being sent:', {
        'Content-Type': requestHeaders.get('Content-Type'),
        Authorization: requestHeaders.get('Authorization'),
      });

      const response = await fetch(apiUrl, { headers: requestHeaders });
      if (!response.ok) {
        console.error('API response status:', response.status);
        const errorText = await response.text();
        console.error('API error details:', errorText);
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
