/**
 * Passes data to the createPost function in api/post and handles the response
 */

import { PostService } from "../../api/post/postService";
import { basePath } from "../../api/constants.js";

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
    author: userDetails ? userDetails.name : "Anonymous",
  };

  try {
    const createdPost = await postService.createPost(data);
    console.log("Post created successfully:", createdPost);
    window.location.pathname = `${basePath}/`;
  } catch (error) {
    console.error("Failed to create post:", error);
  }
}

