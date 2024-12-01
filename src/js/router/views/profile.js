/*import { authGuard } from "../../utilities/authGuard.js";
import { Profile } from "../../api/profile/profile.js";

authGuard();

console.log("Profile page script is running");

(async function initializeProfilePage() {
  if (document.readyState === "loading") {
    console.log("DOM is still loading, setting event listener");
    document.addEventListener("DOMContentLoaded", setupProfilePage);
  } else {
    console.log("DOM already loaded, running setup directly");
    setupProfilePage();
  }
})();

async function setupProfilePage() {
  console.log("Setting up profile page");

  try {
    const profileApi = new Profile();
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    console.log("User details from localStorage:", userDetails);

    if (!userDetails || !userDetails.name) {
      console.error("User details are missing or invalid.");
      return;
    }

    const username = userDetails.name;

    // Fetch the user's profile with posts
    const userProfile = await profileApi.getProfile(username, true);
    console.log("User Profile with Posts:", userProfile);

    // Render profile details
    renderProfileDetails(userProfile.data);

    // Render user posts with username
    renderUserPosts(userProfile.data.posts || [], userProfile.data.name);
  } catch (error) {
    console.error("Error fetching user profile or posts:", error.message);
  }
}

function renderProfileDetails(userProfile) {
  const profileSection = document.getElementById("profile-details");
  console.log("This is the username:", userProfile.name);

  if (!profileSection) {
    console.error("Profile details section not found.");
    return;
  }

  profileSection.innerHTML = `
    <h2>${userProfile.name}</h2>
    <p>Email: ${userProfile.email}</p>
    ${userProfile.bio ? `<p>Bio: ${userProfile.bio}</p>` : ""}
    ${
      userProfile.avatar?.url
        ? `<img src="${userProfile.avatar.url}" alt="${userProfile.avatar.alt || "Avatar"}" />`
        : ""
    }
    ${
      userProfile.banner?.url
        ? `<img src="${userProfile.banner.url}" alt="${userProfile.banner.alt || "Banner"}" />`
        : ""
    }
  `;
}

function renderUserPosts(posts, username) {
  const postsSection = document.getElementById("user-posts");

  if (!postsSection) {
    console.error("User posts section not found.");
    return;
  }

  if (!posts.length) {
    postsSection.innerHTML = `<h2>${username}'s Posts</h2><p>No posts found.</p>`;
    return;
  }

  const postsList = document.createElement("ul");
  posts.forEach((post) => {
    const postItem = document.createElement("li");
    postItem.innerHTML = `
      <h3>
        <a href="${basePath}/post/?id=${post.id}" class="post-link">${post.title}</a>
      </h3>
      <p>${post.body}</p>
      ${
        post.image
          ? `<img src="${post.image}" alt="Post image" />`
          : ""
      }
    `;
    postsList.appendChild(postItem);
  });

  postsSection.innerHTML = `<h2>${username}'s Posts</h2>`;
  postsSection.appendChild(postsList);
}
*/

import { PostService } from "../../api/post/postService.js";
import { PostsRenderer } from "../../ui/post/postsRenderer.js";

// Function to fetch and display user profile details
async function loadProfileDetails() {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  if (!userDetails) {
    console.error("User details not found in localStorage.");
    return;
  }

  console.log("User details:", userDetails);

  // Display basic profile details
  const profileContainer = document.getElementById("profile-details");
  if (profileContainer) {
    profileContainer.innerHTML = `
      <h1>${userDetails.name}</h1>
      <p>Email: ${userDetails.email}</p>
      ${userDetails.avatar ? `<img src="${userDetails.avatar}" alt="Avatar">` : ""}
      ${userDetails.bio ? `<p>Bio: ${userDetails.bio}</p>` : ""}
    `;
  } else {
    console.error("Profile container not found.");
  }
}

// Function to initialize PostsRenderer for user posts
function initializeUserPostsRenderer() {
  const postService = new PostService();
  const postsRenderer = new PostsRenderer("user-posts");

  console.log("Fetching user's posts...");
  postsRenderer.init(async () => await postService.readUserPosts(10, 1)); // Adjust API call as necessary
}

// Ensure DOM is fully loaded before initialization
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    loadProfileDetails();
    initializeUserPostsRenderer();
  });
} else {
  loadProfileDetails();
  initializeUserPostsRenderer();
}



