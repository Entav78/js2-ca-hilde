import { Login } from '../../api/auth/login.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('Login.js is running');

  const form = document.forms.login; // Ensure the form's `name` is 'login'
  if (form) {
    console.log('Login form found:', form);

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const data = {
        email: formData.get('email'),
        password: formData.get('password'),
      };

      const loginInstance = new Login();

      try {
        console.log('Submitting login request...');
        const userData = await loginInstance.login(data);

        // Save token and user details
        localStorage.setItem('token', userData.accessToken);
        console.log('Token saved to localStorage:', userData.accessToken);

        const userDetails = {
          name: userData.name,
          email: userData.email,
          avatar: userData.avatar,
          banner: userData.banner,
          bio: userData.bio,
        };
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        console.log('User details saved to localStorage:', userDetails);

        // Redirect to profile
        alert('Login successful!');
        window.location.pathname = '/profile/'; // Adjust based on routing
      } catch (error) {
        alert(`Login failed: ${error.message}`);
        console.error('Login error:', error);
      }
    });
    console.log('Login form event listener attached.');
  } else {
    console.error('Login form not found.');
  }
});
