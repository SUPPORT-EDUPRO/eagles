import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    },
    // Cache busting
    assetsInlineLimit: 0,
    // Clear cache on build
    emptyOutDir: true,
  },
  server: {
    hmr: {
      port: 5174
    },
    host: 'localhost',
    port: 5174
  }
})
