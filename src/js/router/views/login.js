import { Login } from '../../api/auth/login.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('Login.js is running');

  const form = document.forms.login;
  if (form) {
    console.log('Login form found:', form);

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      console.log('Login form submitted');

      // Capture form data
      const formData = new FormData(event.target);
      const data = {
        email: formData.get('email'),
        password: formData.get('password'),
      };

      console.log('Form data:', data);

      // Perform login (replace with your Login class logic)
      try {
        const loginInstance = new Login();
        const userData = await loginInstance.login(data);
        console.log('Login successful:', userData);

        // Save token and redirect
        localStorage.setItem('token', userData.accessToken);
        window.location.href = '/profile/';
      } catch (error) {
        console.error('Login failed:', error.message);
      }
    });
  } else {
    console.error('Login form not found.');
  }
});
