/*import { authGuard } from "../../utilities/authGuard";
import { Profile } from "../../api/profile/profile.js";

authGuard();

console.log("profile page is running");


document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOMContentLoaded event fired!");
  
  try {
    const profileApi = new Profile();
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    console.log("userDetails from localStorage:", userDetails);


    if (!userDetails || !userDetails.name) {
      console.error("User details are missing or invalid.");
      return;
    }

    const username = userDetails.name;

    // Fetch the user's profile with posts
    const userProfile = await profileApi.getProfile(username, true);
    console.log("User Profile with Posts:", userProfile);

    // Render profile details
    renderProfileDetails(userProfile);

    // Render user posts
    renderUserPosts(userProfile.posts || []);
  } catch (error) {
    console.error("Error fetching user profile or posts:", error.message);
  }
});


function renderProfileDetails(userProfile) {
  const profileSection = document.getElementById("profile-details");

  // Ensure the profile section exists in the DOM
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

function renderUserPosts(posts) {
  const postsSection = document.getElementById("user-posts");

  // Ensure the posts section exists in the DOM
  if (!postsSection) {
    console.error("User posts section not found.");
    return;
  }

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
      ${
        post.image
          ? `<img src="${post.image}" alt="Post image" />`
          : ""
      }
      <button data-id="${post.id}" class="edit-post-button">Edit</button>
      <button data-id="${post.id}" class="delete-post-button">Delete</button>
    `;
    postsList.appendChild(postItem);
  });

  postsSection.innerHTML = "<h2>Your Posts</h2>";
  postsSection.appendChild(postsList);
}

*/

import { authGuard } from "../../utilities/authGuard";
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

    // Render user posts
    renderUserPosts(userProfile.data.posts || []);
  } catch (error) {
    console.error("Error fetching user profile or posts:", error.message);
  }
}

function renderProfileDetails(userProfile) {
  const profileSection = document.getElementById("profile-details");

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

function renderUserPosts(posts) {
  const postsSection = document.getElementById("user-posts");

  if (!postsSection) {
    console.error("User posts section not found.");
    return;
  }

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
      ${
        post.image
          ? `<img src="${post.image}" alt="Post image" />`
          : ""
      }
    `;
    postsList.appendChild(postItem);
  });

  postsSection.innerHTML = "<h2>Your Posts</h2>";
  postsSection.appendChild(postsList);
}
