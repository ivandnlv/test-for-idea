import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import { copy } from 'copy-vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({ targets: ['defaults', 'ie 11'] }),
    copy({
      pattern: [
        // copy file
        { from: 'tickets.json', to: 'tickets.json' },
      ],
    }),
  ],
  build: {
    target: 'es6',
  },
});
