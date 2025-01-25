import path, { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      'bootstrap-css': '/node_modules/bootstrap/dist/css/bootstrap.min.css', // Ensure absolute path for deployment
      'bootstrap-js': '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
    },
  },
  appType: 'mpa', // Multi-Page Application
  base: process.env.NODE_ENV === 'development' ? '/' : '/js2-ca-hilde/', // Base path for development and production
  build: {
    target: 'esnext', // Modern build target
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
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use 'sass:color';`, // Inject global SCSS usage
        includePaths: [path.resolve(__dirname, 'src/scss')], // Include SCSS paths
      },
    },
  },
  test: {
    environment: 'jsdom',
  },
});
