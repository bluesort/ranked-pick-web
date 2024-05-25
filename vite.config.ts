import { defineConfig } from 'vite';
import path from "path";
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    host: true,
    port: 8000,
    proxy: {
      "/dev_api": {
        target: "http://host.docker.internal:3000",
        rewrite: path => path.replace(/^\/dev_api/, ''),
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
