import { authGuard } from "../../utilities/authGuard.js";
import { Profile } from "../../api/profile/profile.js";

const token = localStorage.getItem("token"); // Retrieves the saved token
console.log("Token from localStorage:", token);

// Ensure the user is logged in before accessing the Profile page
authGuard();

document.addEventListener("DOMContentLoaded", async () => {
  const profileApi = new Profile();
  try {
    const profiles = await profileApi.getProfiles(10, 1); // Fetch first page of profiles
    console.log("Profiles List:", profiles);
    // Render the profiles on the page
  } catch (error) {
    console.error("Error fetching profiles:", error.message);
  }
});
