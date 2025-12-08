import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  server:
    command === "serve"
      ? {
          proxy: {
            "/api": "https://forwriters-server.onrender.com",
          },
        }
      : undefined,
  build: {
    outDir: "dist",
  },
}));

