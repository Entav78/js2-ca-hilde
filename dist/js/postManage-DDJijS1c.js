import{a as f}from"./authGuard-B-UGLlJ5.js";import{P as l}from"./postService-BX17DY9b.js";import{b as p}from"./app-BThhd6Gm.js";import"./headers-CUOiYHL-.js";class m{constructor(o,t=new l){if(!(o instanceof HTMLFormElement))throw new Error("Invalid form element provided to PostManager.");this.form=o,this.postService=t,this.form.addEventListener("submit",this.handleFormSubmit.bind(this))}async handleFormSubmit(o){o.preventDefault();const t=this.form.dataset.action,n=this.form.dataset.postId||null,e=new FormData(this.form),u={title:e.get("title"),body:e.get("body"),tags:e.get("tags")?.split(",").map(s=>s.trim()),media:{url:e.get("mediaUrl"),alt:e.get("mediaAlt")}};try{if(!t)throw new Error("Action not specified in form.");const s=await this.postService.handlePost(t,u,n);console.log(`Post ${t}d successfully:`,s),alert(`Post ${t}d successfully!`),window.location.pathname=`${p}/`}catch(s){console.error(`Failed to ${t} post:`,s),alert(`Error: ${s.message}`)}}static async handleDelete(o,t=new l){try{if(!confirm("Are you sure you want to delete this post?"))return;const e=await t.handlePost("delete",null,o);console.log("Post deleted successfully:",e),alert(e.message),window.location.pathname="/"}catch(n){console.error("Failed to delete post:",n),alert(`Error: ${n.message}`)}}}f();const r=document.forms.managePostForm,d=document.getElementById("saveButton"),a=document.getElementById("deletePostButton"),c=r.dataset.postId;c?(r.dataset.action="update",d.textContent="Save Changes",a.dataset.postId=c,a.style.display="inline-block"):(r.dataset.action="create",d.textContent="Create Post",a.style.display="none");new m(r);a&&a.addEventListener("click",()=>{const i=a.dataset.postId;i?m.handleDelete(i):alert("No post selected for deletion.")});
