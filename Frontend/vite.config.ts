import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// build fixed
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",

  resolve: {
    dedupe: ["react", "react-dom"],
  },

  build: {
    chunkSizeWarningLimit: 1000,
  },
});
