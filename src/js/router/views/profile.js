import { authGuard } from "../../utilities/authGuard.js";
import { Profile } from "../../api/profile/profile.js";

authGuard();

document.addEventListener("DOMContentLoaded", async () => {
  const profileApi = new Profile();
  const username = localStorage.getItem("userDetails"); // Adjust if the username is stored differently

  try {
    const userProfile = await profileApi.getProfile(username, true); // Fetch profile with posts
    console.log("User Profile with Posts:", userProfile);
    console.log("Profile data:", data);


    // Render profile details
    renderProfileDetails(userProfile);

    // Render posts
    renderUserPosts(userProfile.posts);
  } catch (error) {
    console.error("Error fetching user profile or posts:", error.message);
  }
});

function renderProfileDetails(profile) {
  const profileSection = document.getElementById("profile-details");
  profileSection.innerHTML = `
    <h2>${profile.name}</h2>
    <p>Email: ${profile.email}</p>
    ${profile.bio ? `<p>Bio: ${profile.bio}</p>` : ""}
    ${profile.avatar?.url ? `<img src="${profile.avatar.url}" alt="${profile.avatar.alt}" />` : ""}
    ${profile.banner?.url ? `<img src="${profile.banner.url}" alt="${profile.banner.alt}" />` : ""}
  `;
}

function renderUserPosts(posts) {
  const postsSection = document.getElementById("user-posts");
  if (!posts.length) {
    postsSection.innerHTML = "<p>No posts found.</p>";
    return;
  }

  const postsList = document.createElement("ul");
  posts.forEach((post) => {
    const postItem = document.createElement("li");
    postItem.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.body}</p>
      ${post.image ? `<img src="${post.image}" alt="Post image" />` : ""}
      <button data-id="${post.id}" class="edit-post-button">Edit</button>
      <button data-id="${post.id}" class="delete-post-button">Delete</button>
    `;
    postsList.appendChild(postItem);
  });
  postsSection.innerHTML = "<h2>Your Posts</h2>";
  postsSection.appendChild(postsList);
}














