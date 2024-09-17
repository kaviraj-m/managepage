import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/projects': 'http://localhost:5000',
      '/upload': 'http://localhost:5000',
    },
  },
});
