import { Login } from '../../api/auth/login.js';
import { basePath } from '../../api/constants.js';

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
        const userData = await loginInstance.login(data);
        console.log('Login successful:', userData);

        localStorage.setItem('token', userData.accessToken);
        window.location.pathname = `${basePath}/profile/`;
      } catch (error) {
        console.error('Login failed:', error.message);
      }
    });
    console.log('Event listener attached to login form.');
  } else {
    console.error('Login form not found.');
  }
}
