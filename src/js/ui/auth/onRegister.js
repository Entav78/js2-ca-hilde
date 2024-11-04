/**
 * This function (onRegister) should pass data to the register function in api/auth and handle the response
 */

import { UserRegistration } from '../../ui/auth/register';

export function onRegister(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');

  const newUser = new UserRegistration(name, email, password);
  newUser.register();
}