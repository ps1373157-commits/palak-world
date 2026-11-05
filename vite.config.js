import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  base: './',

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin/index.html'),
        app: resolve(__dirname, 'app/index.html')
      }
    },
    outDir: 'dist',
    emptyOutDir: true
  },

  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true
  }
});
