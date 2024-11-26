export class PostsRenderer {
  constructor(containerId) {
    this.containerId = containerId;
    this.container = null;
  }

  async init(fetchPostsFunction) {
    this.container = document.getElementById(this.containerId);

    if (!this.container) {
      console.error(`Container with ID "${this.containerId}" not found.`);
      return;
    }

    try {
      const posts = await fetchPostsFunction();
      if (posts.length > 0) {
        this.renderPosts(posts);
      } else {
        this.renderMessage("No posts available.");
      }
    } catch (error) {
      this.renderMessage(`Error loading posts: ${error.message}`);
      console.error("Error fetching posts:", error);
    }
  }

  renderPosts(posts) {
    this.container.innerHTML = ""; 

    posts.forEach((post) => {
      const postElement = this.createPostElement(post);
      this.container.appendChild(postElement);
    });
  }

  createPostElement(post) {
    const postElement = document.createElement("div");
    postElement.className = "post";

    const titleElement = document.createElement("h3");
    titleElement.textContent = post.title;
    titleElement.addEventListener("click", () => {
      window.location.pathname = `/post/?id=${post.id}`;
    });

    postElement.appendChild(titleElement);
    return postElement;
  }

  renderMessage(message) {
    this.container.innerHTML = `<p>${message}</p>`;
  }
}
