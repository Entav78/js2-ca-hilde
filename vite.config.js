import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  appType: "mpa",
  base: "/js2-ca-hilde/", // Set the base path for GitHub Pages
  build: {
    target: "esnext",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./index.html"),
        login: resolve(__dirname, "./auth/login/index.html"),
        auth: resolve(__dirname, "./auth/index.html"),
        register: resolve(__dirname, "./auth/register/index.html"),
        profile: resolve(__dirname, "./profile/index.html"),
        post: resolve(__dirname, "./post/index.html"),
        editPost: resolve(__dirname, "./post/edit/index.html"),
        createPost: resolve(__dirname, "./post/create/index.html"),
      },
      output: {
        entryFileNames: "js/[name].js", // JavaScript files go into the js/ folder
        chunkFileNames: "js/[name].js", // Dynamic imports also go into js/
        assetFileNames: "assets/[ext]/[name].[ext]", // CSS, images, etc., go into assets/
      },
    },
  },
  test: {
    environment: "jsdom", // Use jsdom for DOM testing
  },
});
