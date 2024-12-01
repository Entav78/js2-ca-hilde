/* comment out for testing
import { basePath } from "../api/constants.js";

export default async function router(pathname = window.location.pathname) {
  console.log("Router running");

  const cleanPathname = pathname.replace(basePath, "") || "/";
  console.log("Clean Pathname:", cleanPathname);

  try {
    switch (cleanPathname) {
      case "/":
      console.log("Loading home view");
      await import("./views/home.js");
      break;
    case "/auth/":
      await import("./views/auth.js");
      break;
    case "/auth/login/":
      await import("./views/login.js");
      break;
    case "/auth/register/":
      await import("./views/register.js");
      break;
    case "/post/":
      await import("./views/post.js");
      break;    
    case "/post/edit/":
      await import("./views/postEdit.js");
      break;
    case "/post/manage/":
      await import("./views/postManage.js");
      break;  
    case "/profile/":
      await import("./views/profile.js");
      break;
    default:
      await import("./views/notFound.js");
    }
  } catch (error) {
    console.error("Router Error:", error.message);
  }
}
*/

import { basePath } from "../api/constants.js";

export default async function router(pathname = window.location.pathname) {
  console.log("Router running");

  const cleanPathname = pathname.replace(basePath, "") || "/";
  console.log("Clean Pathname:", cleanPathname);

  try {
    switch (cleanPathname) {
      case "/":
        console.log("Loading home view");
        await import(`${basePath}/src/js/router/views/home.js`);
        break;
      case "/auth/":
        await import(`${basePath}/src/js/router/views/auth.js`);
        break;
      case "/auth/login/":
        await import(`${basePath}/src/js/router/views/login.js`);
        break;
      case "/auth/register/":
        await import(`${basePath}/src/js/router/views/register.js`);
        break;
      case "/post/":
        await import(`${basePath}/src/js/router/views/post.js`);
        break;    
      case "/post/edit/":
        await import(`${basePath}/src/js/router/views/postEdit.js`);
        break;
      case "/post/manage/":
        await import(`${basePath}/src/js/router/views/postManage.js`);
        break;  
      case "/profile/":
        await import(`${basePath}/src/js/router/views/profile.js`);
        break;
      default:
        await import(`${basePath}/src/js/router/views/notFound.js`);
    }
  } catch (error) {
    console.error("Router Error:", error.message);
  }
}
