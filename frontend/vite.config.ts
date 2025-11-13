import dotenv from 'dotenv';
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: process.env.VITE_WEB_HOST?.replace(/^https?:\/\//, '') || 'localhost',
        port: Number(process.env.VITE_WEB_PORT) || 3000,
        proxy: {
            "/api": "http://localhost:3001",
            },
        },
});
