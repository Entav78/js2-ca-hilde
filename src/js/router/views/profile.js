import { authGuard } from "../../utilities/authGuard";
import { Profile } from "../../api/profile/profile.js";

console.log("Token on page load:", localStorage.getItem("token"));
console.log("Running profile page...");
const token = localStorage.getItem("token"); // Retrieves the saved token
console.log("Token from localStorage:", token);

// Ensure the user is logged in before accessing the Profile page
authGuard();

document.addEventListener("DOMContentLoaded", async () => {
  const profileApi = new Profile();
  try {
    const userProfile = await profileApi.getProfile(null, true); // Fetch logged-in user's profile
    console.log("User Profile:", userProfile);
    // Render the profile on the page
  } catch (error) {
    console.error("Error fetching profile:", error.message);
  }
});











