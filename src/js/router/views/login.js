import { Login } from '../../api/auth/login.js';
import { basePath } from '../../api/constants.js';

console.log('Base Path in login.js:', basePath);
console.log('login.js imported');

export function initializeLoginPage() {
  console.log('Initializing Login Page...');

  const form = document.forms.login;
  if (form) {
    console.log('Login form found:', form);

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      console.log('Login form submitted');

      const formData = new FormData(event.target);
      const data = {
        email: formData.get('email'),
        password: formData.get('password'),
      };

      console.log('Form data:', data);

      try {
        const loginInstance = new Login();
        const responseData = await loginInstance.login(data); // Get the full response
        const userData = responseData.data; // Extract the `data` part containing user details

        console.log('Login successful:', userData);

        localStorage.setItem('token', userData.accessToken);
        console.log('Access token saved:', userData.accessToken);

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
        console.log('User details saved in localStorage:', userData);

        console.log('Redirecting to:', `${basePath}/profile/`);
        window.location.pathname = `${basePath}/profile/`;
      } catch (error) {
        console.error('Login failed:', error.message);
        alert(`Login failed: ${error.message}`);
      }
    });

    console.log('Event listener attached to login form.');
  } else {
    console.error('Login form not found.');
  }
}
