import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    },
    sourcemap: true,
    minify: 'esbuild'
  },
  server: {
    port: 3000,
    open: true
  },
  optimizeDeps: {
    include: ['tesseract.js', 'pdfjs-dist']
  }
});
