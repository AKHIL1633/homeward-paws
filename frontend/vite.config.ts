import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

// In Docker the API is reachable at http://backend:5000; locally at :5000.
const backendUrl = process.env.BACKEND_INTERNAL_URL ?? 'http://localhost:5000';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': { target: backendUrl, changeOrigin: true },
      '/uploads': { target: backendUrl, changeOrigin: true },
    },
  },
});
