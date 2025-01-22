import{a as l,b as g}from"./app-Dt6L41Z_.js";import{h as c}from"./headers-Bl62LTOv.js";class u{async register(a){console.log("Data being sent to API:",a);try{const t=await fetch(l,{method:"POST",headers:c(),body:JSON.stringify(a)});if(console.log("Response object:",t),!t.ok){const r=await t.json();console.error("Error response from API:",r);const n=r?.errors?.[0]?.message||r.message||"Registration failed.";throw new Error(n)}const e=await t.json();return console.log("Successful registration response:",e),e}catch(t){throw console.error("Error during registration:",t.message),t}}async handleRegister(a){a.preventDefault();const t=document.getElementById("registration-error");t.textContent="";const e=new FormData(a.target),r={name:e.get("name"),email:e.get("email"),password:e.get("password"),bio:e.get("bio")||null,avatar:{url:e.get("avatarUrl")||null,alt:e.get("avatarAlt")||null},banner:{url:e.get("bannerUrl")||null,alt:e.get("bannerAlt")||null},venueManager:e.get("venueManager")==="on"};!r.avatar.url&&!r.avatar.alt&&delete r.avatar,!r.banner.url&&!r.banner.alt&&delete r.banner;const n=JSON.parse(JSON.stringify(r,(s,i)=>i===null?void 0:i));console.log("Sanitized data being sent:",n);try{const s=await this.register(n);alert("Registration successful! Please log in to continue."),window.location.pathname=`${g}/auth/login/`}catch(s){console.error("Error during registration:",s.message),t.textContent=`Registration failed: ${s.message}`}}}const d=new u(l),m=document.forms.register;m.addEventListener("submit",o=>d.handleRegister(o));
