// Function to extract the post ID from the URL
function getPostIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Import required services
import { PostService } from "../../api/post/postService";

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
  const postContainer = document.getElementById("postContainer");
  if (!postContainer) {
    console.error("Post container not found.");
    return;
  }

  // Access post data correctly
  const postData = post.data;

  // Safely extract post properties with fallback values
  const title = postData.title || "Untitled Post";
  const body = postData.body || "No content available.";
  const mediaUrl = postData.media?.url || "";
  const mediaAlt = postData.media?.alt || "Post image";
  const tags = postData.tags?.length ? postData.tags.join(", ") : "No tags available.";
  const createdDate = postData.created ? new Date(postData.created).toLocaleString() : "Unknown date";
  const author = postData.author?.name || "Unknown Author";

  // Generate HTML for the post
  postContainer.innerHTML = `
    <h1>${title}</h1>
    <p>${body}</p>
    ${mediaUrl ? `<img src="${mediaUrl}" alt="${mediaAlt}" />` : ""}
    <p>Tags: ${tags}</p>
    <p>Created: ${createdDate}</p>
    <p>Author: ${author}</p>
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
      window.location.pathname = `/post/manage/?id=${post.id}`;
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
          window.location.pathname = "/";
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


