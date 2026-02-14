import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// build added
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",

  build:{ 
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("antd")) return "antd"
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router-dom")
            )
              return "vendor"
          }
        },
      },
    },
  },
})
