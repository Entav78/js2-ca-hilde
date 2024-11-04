/**
 * This function (onRegister) should pass data to the register function in api/auth and handle the response
  I have moved this to a onRegister.js-file*/

/*export async function onRegister(event) {}*/

import { API_AUTH_REGISTER } from "../../api/constants.js";

class UserRegistration {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  async register() {
    try {
      const response = await fetch(API_AUTH_REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: this.name, email: this.email, password: this.password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors[0].message || 'Failed to register');
      }

      alert('Registration successful!');
      window.location.href = '/auth/login/';
    } catch (error) {
      alert(`Registration failed: ${error.message}`);
    }
  }
}