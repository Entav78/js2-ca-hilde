import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  appType: 'mpa',
  base: process.env.NODE_ENV === 'development' ? '/' : '/js2-ca-hilde/', // Dynamically set the base path
  resolve: {
    alias: {
      bootstrap: resolve(__dirname, 'node_modules/bootstrap'),
    },
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      input: {
        main: resolve(__dirname, './index.html'),
        login: resolve(__dirname, './auth/login/index.html'),
        auth: resolve(__dirname, './auth/index.html'),
        register: resolve(__dirname, './auth/register/index.html'),
        profile: resolve(__dirname, './profile/index.html'),
        post: resolve(__dirname, './post/index.html'),
        editPost: resolve(__dirname, './post/edit/index.html'),
        createPost: resolve(__dirname, './post/manage/index.html'),
      },
      external: ['bootstrap'],
    },
  },
  /*optimizeDeps: {
    include: ['bootstrap/dist/js/bootstrap.bundle.min.js'],
  },*/
  test: {
    environment: 'jsdom', // Use jsdom for DOM testing
  },
});
