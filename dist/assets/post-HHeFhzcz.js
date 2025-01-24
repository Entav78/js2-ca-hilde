import{P as l}from"./postService-UowkdJZx.js";import{b as r}from"./app-aTn1yUF9.js";import"./headers-CYnZ5qCU.js";function p(){return new URLSearchParams(window.location.search).get("id")}const c=new l;async function s(){const e=p();if(!e){i("Post not found.");return}try{const t=await c.readPost(e);console.log("Loaded post:",t),u(t),m(t)}catch(t){console.error("Error loading post:",t),i(`Error loading post: ${t.message}`)}}function u(e){const t=e.data,o=document.querySelector(".post-container");if(!o){console.error("Post container not found.");return}o.innerHTML=`
    <h1>${t.title||"Untitled Post"}</h1>
    <p>${t.body||"No content available."}</p>
    ${t.media?.url?`<img src="${t.media.url}" alt="${t.media.alt||"Post image"}" />`:"<p>No image available.</p>"}
    <p>Tags: ${t.tags?.join(", ")||"No tags available."}</p>
    <p>Created: ${t.created?new Date(t.created).toLocaleString():"Unknown date"}</p>
    <p>Updated: ${t.updated?new Date(t.updated).toLocaleString():"Unknown date"}</p>
  `}function m(e){if(JSON.parse(localStorage.getItem("userDetails"))?.name===e.author?.name){const o=document.querySelector(".buttons-container");if(!o){console.error("Buttons container not found.");return}o.innerHTML="";const n=document.createElement("button");n.textContent="Edit Post",n.className="btn btn-primary",n.addEventListener("click",()=>{window.location.pathname=`${r}/post/manage/?id=${e.id}`}),o.appendChild(n);const a=document.createElement("button");a.textContent="Delete Post",a.className="btn btn-danger",a.addEventListener("click",async()=>{if(confirm("Are you sure you want to delete this post?"))try{await c.deletePost(e.id),alert("Post deleted successfully."),window.location.pathname=`${r}/`}catch(d){alert(`Error deleting post: ${d.message}`)}}),o.appendChild(a)}}function i(e){const t=document.querySelector(".post-container");t&&(t.innerHTML=`<p>${e}</p>`)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",s):s();
