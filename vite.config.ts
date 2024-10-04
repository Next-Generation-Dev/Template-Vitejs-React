import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import sitemap from "vite-plugin-sitemap";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: "https://next-generation.dev",
      dynamicRoutes: ["/", "/*"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    __APP_ENV__: process.env.VITE_VERCEL_ENV,
  },
  build: {
    outDir: "dist",
  },
  base: "./",
});
