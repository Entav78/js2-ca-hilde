import { authGuard } from "../../utilities/authGuard";
import { Navigation } from "../../ui/global/navigation";

authGuard();

console.log("profile.js is running.");

console.log("Testing if DOM is already loaded.");
const container = document.getElementById("navContainer");
console.log("navContainer found without DOMContentLoaded:", container);

if (container) {
  const navigation = new Navigation("navContainer");
  navigation.createHomeButton();
  console.log("Navigation setup completed.");
} else {
  console.error("navContainer not found.");
}










