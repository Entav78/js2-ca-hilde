// This function controls which JavaScript file is loaded on which page
// In order to add additional pages, you will need to implement them below
// You may change the behaviour or approach of this file if you choose

const basePath = "/js2-ca-hilde"; // GitHub Pages base path

export default async function router(pathname = window.location.pathname) {
  // Remove basePath from pathname for internal routing
  const cleanPathname = pathname.replace(basePath, "") || "/";

  switch (cleanPathname) {
    case "/":
      console.log("Loading home view");
      await import("../views/home.js");
      break;
    case "/auth/":
      await import("../views/auth.js");
      break;
    case "/auth/login/":
      await import("../views/login.js");
      break;
    case "/auth/register/":
      await import("../views/register.js");
      break;
    case "/post/":
      await import("../views/post.js");
      break;    
    case "/post/edit/":
      await import("../views/postEdit.js");
      break;
    case "/post/manage/":
      await import("../views/postManage.js");
      break;  
    case "/profile/":
      await import("../views/profile.js");
      break;
    default:
      await import("../views/notFound.js");
  }
}

