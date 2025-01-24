import{c}from"./app-aTn1yUF9.js";import{h as l}from"./headers-CYnZ5qCU.js";class w{constructor(e=c){this.baseURL=e}async handlePost(e,r=null,s=null){const o=localStorage.getItem("accessToken");if(!o||o==="undefined")throw new Error("Invalid or missing accessToken. Please log in again.");let t=this.baseURL,i="POST";if(console.log("Data sent to API:",r),e==="update"&&s)t+=`/${s}`,i="PUT";else if(e==="delete"&&s)t+=`/${s}`,i="DELETE";else if(e!=="create")throw new Error("Invalid action or missing postId.");try{const a=l(o);console.log("Headers in request:",[...a.entries()]);const n=await fetch(t,{method:i,headers:a,body:e==="delete"?null:JSON.stringify(r)});if(!n.ok)throw console.error("Error response from server:",n),new Error(`Failed to ${e} post: ${n.statusText}`);return e==="delete"?{message:"Post deleted successfully"}:await n.json()}catch(a){throw console.error(`Error during ${e} post:`,a),a}}async createPost(e){const r=JSON.parse(localStorage.getItem("userDetails"));if(!r||!r.name)throw new Error("User details not found. Please log in again.");const s={...e,author:r.name};if(!s.title)throw new Error("Title is required to create a post.");return this.handlePost("create",s)}async updatePost(e,r){if(!e)throw new Error("Post ID is required to update a post.");return this.handlePost("update",r,e)}async deletePost(e){if(!e)throw new Error("Post ID is required to delete a post.");return this.handlePost("delete",null,e)}async readPost(e){const r=localStorage.getItem("accessToken");if(!r||r==="undefined")throw new Error("Invalid or missing accessToken. Please log in again.");const s=await fetch(`${this.baseURL}/${e}`,{headers:l(r)});if(!s.ok)throw new Error(`Failed to fetch post: ${s.statusText}`);return s.json()}async readPosts(e=12,r=1){const s=localStorage.getItem("accessToken");if(!s||s==="undefined")throw new Error("Invalid or missing accessToken. Please log in again.");const o=new URLSearchParams({limit:e,page:r}),t=await fetch(`${this.baseURL}?${o.toString()}`,{headers:l(s)});if(!t.ok)throw new Error(`Failed to fetch posts: ${t.statusText}`);return t.json()}}export{w as P};
