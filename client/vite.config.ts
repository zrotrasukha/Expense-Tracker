import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { tanstackRouter } from "@tanstack/router-plugin/vite"
import { defineConfig } from "vite"
// https://vite.dev/config/

export default defineConfig({
  plugins: [tanstackRouter({
    target: 'react',
    autoCodeSplitting: true,
  }), react(), tailwindcss()],
  server: {
    port: 3000,
    host: true,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://localhost:4000",
      }
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@server": path.resolve(__dirname, "../server"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
})