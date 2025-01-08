import { headers } from '../headers.js';

console.log('Headers for API call:', headers());
export class Profile {
  constructor(baseApiUrl = 'https://v2.api.noroff.dev/social/profiles') {
    this.baseApiUrl = baseApiUrl;
  }

  /**
   * Fetches a specific profile or the logged-in user's profile.
   * @param {string} [username] - The username of the profile to fetch (optional).
   * @param {boolean} [includePosts] - Whether to include posts in the response (optional, default: false).
   * @returns {Promise<Object>} - The profile data.
   */
  async getProfile(includePosts = false) {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    const userDetails = JSON.parse(localStorage.getItem('userDetails')); // Retrieve userDetails from localStorage

    console.log('Token from localStorage:', token);
    console.log('User details from localStorage:', userDetails);

    if (!token) throw new Error('User is not authenticated');
    if (!userDetails?.name) throw new Error('Logged-in username not found');

    const username = userDetails.name; // Get the logged-in username
    const apiUrl = `${this.baseApiUrl}/${username}?_posts=${includePosts}`; // Use username in the API URL

    console.log('Fetching from API URL in Profile class:', apiUrl);

    try {
      const requestHeaders = headers(token);
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
      if (!response.ok) throw new Error('Failed to fetch profiles');

      const data = await response.json();
      console.log('Profiles data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching profiles:', error.message);
      throw error;
    }
  }
}
