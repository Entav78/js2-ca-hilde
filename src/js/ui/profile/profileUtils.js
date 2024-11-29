import { Profile } from "../../api/profile/profile.js";

export async function fetchCurrentUserProfile() {
  const profileApi = new Profile();
  try {
    const profile = await profileApi.getProfile();
    return profile;
  } catch (error) {
    console.error("Error fetching current user profile:", error.message);
    throw error;
  }
}
