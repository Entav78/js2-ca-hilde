import { authGuard } from "../../utilities/authGuard";

console.log("Token on page load:", localStorage.getItem("token"));
console.log("Running profile page...");
const token = localStorage.getItem("token"); // Retrieves the saved token
console.log("Token from localStorage:", token);

// Ensure the user is logged in before accessing the Profile page
authGuard();












