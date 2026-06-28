// vite.config.js
import { resolve } from 'path';

// GitHub Pages compatibility: set base to './' for relative asset paths.
// When deploying to a custom domain (e.g. username.github.io), change base to '/'.
// When deploying to a project page (e.g. username.github.io/portfolio), change to '/portfolio/'.

export default {
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        caseStudy: resolve(__dirname, 'case-study.html'),
      },
      output: {
        // Predictable chunk names for debugging and caching
        manualChunks: undefined,
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
};
