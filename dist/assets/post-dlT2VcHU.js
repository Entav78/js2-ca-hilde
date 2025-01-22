import{P as l}from"./postService-Bd4RTl1X.js";import{b as r}from"./app-Dt6L41Z_.js";import"./headers-Bl62LTOv.js";function p(){return new URLSearchParams(window.location.search).get("id")}const d=new l;async function s(){const e=p();if(!e){i("Post not found.");return}try{const t=await d.readPost(e);console.log("Loaded post:",t),u(t),m(t)}catch(t){console.error("Error loading post:",t),i(`Error loading post: ${t.message}`)}}function u(e){const t=e.data,o=document.getElementById("postContainer");if(!o){console.error("Post container not found.");return}console.log("Media URL:",t.media?.url),o.innerHTML=`
    <h1>${t.title||"Untitled Post"}</h1>
    <p>${t.body||"No content available."}</p>
    ${t.media?.url?`<img src="${t.media.url}" alt="${t.media.alt||"Post image"}" />`:"<p>No image available.</p>"}
    <p>Tags: ${t.tags?.join(", ")||"No tags available."}</p>
    <p>Created: ${t.created?new Date(t.created).toLocaleString():"Unknown date"}</p>
    <p>Updated: ${t.updated?new Date(t.updated).toLocaleString():"Unknown date"}</p>
  `}function m(e){if(JSON.parse(localStorage.getItem("userDetails"))?.name===e.author?.name){const o=document.querySelector(".buttons-container");if(!o){console.error("Buttons container not found.");return}const n=document.createElement("button");n.textContent="Edit Post",n.addEventListener("click",()=>{window.location.pathname=`${r}/post/manage/?id=${e.id}`}),o.appendChild(n);const a=document.createElement("button");a.textContent="Delete Post",a.addEventListener("click",async()=>{if(confirm("Are you sure you want to delete this post?"))try{await d.deletePost(e.id),alert("Post deleted successfully."),window.location.pathname=`${r}/`}catch(c){alert(`Error deleting post: ${c.message}`)}}),o.appendChild(a)}}function i(e){const t=document.getElementById("postContainer");t&&(t.innerHTML=`<p>${e}</p>`)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",s):s();
