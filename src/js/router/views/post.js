// Function to extract the post ID from the URL
function getPostIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Import required services
import { PostService } from "../../api/post/postService";
import { basePath } from "../../api/constants.js";


// Initialize PostService instance
const postService = new PostService();

// Function to load and display the post
async function loadPost() {
  const postId = getPostIdFromUrl();

  if (!postId) {
    displayMessage("Post not found.");
    return;
  }

  try {
    const post = await postService.readPost(postId);
    console.log("Loaded post:", post);

    displayPost(post);
    displayEditDeleteButtons(post);
  } catch (error) {
    console.error("Error loading post:", error);
    displayMessage(`Error loading post: ${error.message}`);
  }
}

// Function to render post details
function displayPost(post) {
  const postData = post.data; // Access the data property
  
  const postContainer = document.getElementById("postContainer");
  if (!postContainer) {
    console.error("Post container not found.");
    return;
  }

  console.log("Media URL:", postData.media?.url);
  
  postContainer.innerHTML = `
    <h1>${postData.title || "Untitled Post"}</h1>
    <p>${postData.body || "No content available."}</p>
    ${
      postData.media?.url
        ? `<img src="${postData.media.url}" alt="${postData.media.alt || "Post image"}" />`
        : `<p>No image available.</p>`
    }
    <p>Tags: ${postData.tags?.join(", ") || "No tags available."}</p>
    <p>Created: ${postData.created ? new Date(postData.created).toLocaleString() : "Unknown date"}</p>
    <p>Updated: ${postData.updated ? new Date(postData.updated).toLocaleString() : "Unknown date"}</p>
  `;
}



// Function to display edit and delete buttons
function displayEditDeleteButtons(post) {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  if (userDetails?.name === post.author?.name) {
    const buttonsContainer = document.querySelector(".buttons-container");
    if (!buttonsContainer) {
      console.error("Buttons container not found.");
      return;
    }

    // Edit button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit Post";
    editButton.addEventListener("click", () => {
      window.location.pathname = `${basePath}/post/manage/?id=${post.id}`;
    });
    buttonsContainer.appendChild(editButton);

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Post";
    deleteButton.addEventListener("click", async () => {
      const confirmation = confirm("Are you sure you want to delete this post?");
      if (confirmation) {
        try {
          await postService.deletePost(post.id);
          alert("Post deleted successfully.");
          window.location.pathname = `${basePath}/`;
        } catch (error) {
          alert(`Error deleting post: ${error.message}`);
        }
      }
    });
    buttonsContainer.appendChild(deleteButton);
  }
}

// Function to display messages
function displayMessage(message) {
  const postContainer = document.getElementById("postContainer");
  if (postContainer) {
    postContainer.innerHTML = `<p>${message}</p>`;
  }
}

// Ensure DOM is fully loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadPost);
} else {
  loadPost();
}


