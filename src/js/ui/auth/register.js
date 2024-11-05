/**
 * This function (onRegister) should pass data to the register function in api/auth and handle the response
  I have moved this to a onRegister.js-file*/

/*export async function onRegister(event) {}*/

import { register } from "../../api/auth/register.js";

export async function onRegister(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  };

  try {
    await register(data); 
    alert("Registration successful!");
    window.location.href = '/auth/login/';
  } catch (error) {
    alert(`Registration failed: ${error.message}`);
  }
}
