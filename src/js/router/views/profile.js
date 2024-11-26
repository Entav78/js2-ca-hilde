import { Navigation } from "../../ui/global/navigation";

console.log("running profile page...")
document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = !!localStorage.getItem("token"); 
  const navContainer = document.getElementById("navContainer");
  console.log("Navigation container:", navContainer);

  if (!navContainer) {
    console.error("Navigation container not found.");
    return;
  }

  const navigation = new Navigation(navContainer);
  navigation.createNavbar(isLoggedIn);

  console.log("Navigation setup completed in profile.js.");
});











