/* this is the old postManage.js
import { onCreatePost } from "../../ui/post/create";
import { authGuard } from "../../utilities/authGuard";

authGuard();

const form = document.forms.createPost;

form.addEventListener("submit", onCreatePost);
*/

import { authGuard } from "../../utilities/authGuard";
import { PostManager } from "../../ui/post/postManager";

authGuard();

const form = document.forms.managePostForm; // Update form name to match your HTML
if (form) {
  const postManager = new PostManager(form); // Initialize PostManager
  
  // Bind form submission to create/update functionality
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission

    const postId = form.dataset.postId || null; // Retrieve postId if present
    if (postId) {
      postManager.handleUpdate(postId); // Call update if postId exists
    } else {
      postManager.handleCreate(); // Call create otherwise
    }
  });
} else {
  console.error("Manage Post form not found!");
}

// Example: Bind delete button
const deleteButton = document.getElementById("deletePostButton");
if (deleteButton) {
  deleteButton.addEventListener("click", () => {
    const postId = deleteButton.dataset.postId;
    if (postId) {
      PostManager.handleDelete(postId); // Static delete method call
    } else {
      console.error("Post ID is missing for delete action!");
    }
  });
}

