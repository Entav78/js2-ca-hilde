import { Register } from "../../api/auth/register.js";
import { API_AUTH_REGISTER } from "../../api/constants.js";

const registerInstance = new Register(API_AUTH_REGISTER); 
const form = document.forms.register;

form.addEventListener("submit", (event) => registerInstance.handleRegister(event));

