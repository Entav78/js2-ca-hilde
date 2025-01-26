
import { authGuard } from "../../utilities/authGuard.js";
import { PostManager } from "../../ui/post/postManager.js";

authGuard();

const form = document.forms.managePostForm;
const saveButton = document.getElementById("saveButton");
const deleteButton = document.getElementById("deletePostButton");

// Check if postId exists in form.dataset
const postId = form.dataset.postId;

// Update form and button based on action
if (postId) {
  form.dataset.action = "update";
  saveButton.textContent = "Save Changes";
  deleteButton.dataset.postId = postId; // Set the postId for deletion
  deleteButton.style.display = "inline-block"; // Ensure delete button is visible
} else {
  form.dataset.action = "create";
  saveButton.textContent = "Create Post";
  deleteButton.style.display = "none"; // Hide delete button for new posts
}

const postManager = new PostManager(form);

// Attach event listener to delete button
if (deleteButton) {
  deleteButton.addEventListener("click", () => {
    const postIdToDelete = deleteButton.dataset.postId;
    if (postIdToDelete) {
      PostManager.handleDelete(postIdToDelete);
    } else {
      alert("No post selected for deletion.");
    }
  });
}


