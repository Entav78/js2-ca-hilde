import { API_AUTH_LOGIN } from '../constants.js';
import { headers } from '../headers.js';

export class Login {
  /**
   * Logs in a user with the provided email and password.
   *
   * @param {Object} data - The login data.
   * @param {string} data.email - The user's email address.
   * @param {string} data.password - The user's password.
   * @returns {Promise<Object>} A promise that resolves when the login process is complete.
   * @throws {Error} If the login fails or the response is invalid.
   */
  async login(data) {
    try {
      const response = await fetch(API_AUTH_LOGIN, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Login failed.');
      }

      const responseData = await response.json();
      console.log('Login Response Data:', responseData); // Log response for debugging

      // Validate and store token and user details
      const userData = responseData.data;
      if (userData?.accessToken) {
        // Save token
        localStorage.setItem('token', userData.accessToken);
        console.log('Access token saved:', userData.accessToken);

        // Save user details
        localStorage.setItem(
          'userDetails',
          JSON.stringify({
            name: userData.name,
            email: userData.email,
            bio: userData.bio,
            avatar: userData.avatar,
            banner: userData.banner,
          })
        );
        console.log('User details saved:', userData);

        return userData; // Return user details for further processing if needed
      } else {
        throw new Error('No accessToken received in response.');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      throw error; // Re-throw the error to handle it elsewhere
    }
  }
}
