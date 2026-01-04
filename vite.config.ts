import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? "/book_landing_page/" : "/",
  plugins: [
    react(),
    imagetools({
      defaultDirectives: () => {
        // Apply default optimizations to all images
        return new URLSearchParams({
          format: "webp;jpg", // Generate both WebP and JPEG
          quality: "80", // Good balance of quality vs size
        });
      },
    }),
  ],
  define: {
    "import.meta.env.GITHUB_PAGES": JSON.stringify(
      process.env.GITHUB_PAGES === "true"
    ),
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info"],
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["wouter"],
          query: ["@tanstack/react-query"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
