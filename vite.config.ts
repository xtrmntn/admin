import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import env from 'vite-plugin-html-env';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    env(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
