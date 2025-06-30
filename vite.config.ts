import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/jet-telegram-app/",
  // base: "./",
  server: {
    host: true,
    port: 5173,
    https: false, // Для production рекомендуется использовать HTTPS
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true,
  },
});
