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
      await import("../js/views/home.js");
      break;
    case "/auth/":
      await import("../js/views/auth.js");
      break;
    case "/auth/login/":
      await import("../js/views/login.js");
      break;
    case "/auth/register/":
      await import("../js/views/register.js");
      break;
    case "/post/":
      await import("../js/views/post.js");
      break;    
    case "/post/edit/":
      await import("../js/views/postEdit.js");
      break;
    case "/post/manage/":
      await import("../js/views/postManage.js");
      break;  
    case "/profile/":
      await import("../js/views/profile.js");
      break;
    default:
      await import("../js/views/notFound.js");
  }
}

