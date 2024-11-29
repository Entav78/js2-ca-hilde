export class PostsRenderer {
  constructor(containerId) {
    this.containerId = containerId;
    this.container = null;
  }

  async init(fetchPostsFunction) {
    console.log("Initializing PostsRenderer...");
    this.container = document.getElementById(this.containerId);

    if (!this.container) {
      console.error(`Container with ID "${this.containerId}" not found.`);
      return;
    }

    console.log("homeContainer found:", this.container);

    try {
      const posts = await fetchPostsFunction();
const postList = posts?.data || posts; // Use posts.data if available

if (postList.length > 0) {
  this.renderPosts(postList);
} else {
  this.renderMessage("No posts available.");
}

    } catch (error) {
      this.renderMessage(`Error loading posts: ${error.message}`);
      console.error("Error fetching posts:", error);
    }
  }

  renderPosts(posts) {
    console.log("Rendering posts:", posts);
    this.container.innerHTML = ""; 

    posts.forEach((post) => {
      console.log("Rendering post:", post);
      const postElement = this.createPostElement(post);
      this.container.appendChild(postElement);
    });
  }

  createPostElement(post) {
    const postElement = document.createElement("div");
    postElement.className = "post";
  
    const titleElement = document.createElement("h2");
    titleElement.textContent = post.title;
    titleElement.addEventListener("click", () => {
      window.location.href = `/post/?id=${post.id}`;
    });
  
    postElement.appendChild(titleElement);
    return postElement;
  }
  

  renderMessage(message) {
    this.container.innerHTML = `<p>${message}</p>`;
  }
}
