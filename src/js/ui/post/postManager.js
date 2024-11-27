import { PostService } from "../../api/post/postService";

export class PostManager {
  constructor(formElement, postService = new PostService()) {
    if (!(formElement instanceof HTMLFormElement)) {
      throw new Error("Invalid form element provided to PostManager.");
    }

    this.form = formElement;
    this.postService = postService;

    this.form.addEventListener("submit", this.handleFormSubmit.bind(this));
  }

  async handleFormSubmit(event) {
    event.preventDefault();

    const action = this.form.dataset.action; // "create", "update"
    const postId = this.form.dataset.postId; // Used for updates
    const formData = new FormData(this.form);

    const data = {
      title: formData.get("title"),
      body: formData.get("body"),
      tags: formData.get("tags")?.split(",").map(tag => tag.trim()),
      media: {
        url: formData.get("mediaUrl"),
        alt: formData.get("mediaAlt"),
      },
    };

    try {
      if (!action) throw new Error("Action not specified in form.");

      const result = await this.postService.handlePost(action, data, postId);
      console.log(`Post ${action}d successfully:`, result);

      if (action === "delete") {
        alert("Post deleted successfully!");
        window.location.pathname = "/";
      } else {
        alert(`Post ${action}d successfully!`);
        window.location.pathname = "/";
      }
    } catch (error) {
      console.error(`Failed to ${action} post:`, error);
      alert(`Error: ${error.message}`);
    }
  }

  static async handleDelete(postId, postService = new PostService()) {
    try {
      const confirmation = confirm("Are you sure you want to delete this post?");
      if (!confirmation) return;

      const result = await postService.handlePost("delete", null, postId);
      console.log("Post deleted successfully:", result);

      alert(result.message);
      window.location.pathname = "/";
    } catch (error) {
      console.error("Failed to delete post:", error);
      alert(`Error: ${error.message}`);
    }
  }
}
