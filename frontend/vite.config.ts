import dotenv from 'dotenv';
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
    define: {
        'process.env': process.env, // Make all env variables accessible
    },
    plugins: [react()],
    server: {
        host: true,  // ✅ listen on 0.0.0.0 (all interfaces)
        port: 3000,
        proxy: {
        "/api": "http://localhost:3001",
        },
    },
});
