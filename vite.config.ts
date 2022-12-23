import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { dirname, resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [
    tsconfigPaths(),
    react(),
  ],
  optimizeDeps: {
    include: ['lodash/fp']
  },
  define: {
    'process.env': {}
  },
  resolve: {
    alias: {
      "@mui/styled-engine": resolve(__dirname, "./node_modules/@mui/styled-engine-sc"),
    }
  }
});
