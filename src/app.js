/*import "./css/style.css";*/

import router from "./js/router/index.js";
console.log("Router imported successfully");

await router(window.location.pathname);
