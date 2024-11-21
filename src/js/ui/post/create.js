/**
 * Passses data to the createPost function in api/post and handles the response
 */

import { PostService } from "../../api/post/postService";

const postService = new PostService();

export async function onCreatePost(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

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
    const createdPost = await postService.createPost(data);
    console.log("Post created successfully:", createdPost);
    window.location.href = "/";
  } catch (error) {
    console.error("Failed to create post:", error);
  }
}

