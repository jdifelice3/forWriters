import dotenv from 'dotenv';
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

dotenv.config();

if (typeof process.env.VITE_WEB_HOST === 'undefined') {
  throw new Error("Environment variable process.env.VITE_WEB_HOST is undefined");
}
if (typeof process.env.VITE_WEB_PORT === 'undefined') {
  throw new Error("Environment variable process.env.VITE_WEB_PORT is undefined");
}
if (typeof process.env.VITE_API_PORT === 'undefined') {
  throw new Error("Environment variable process.env.VITE_API_PORT is undefined");
}

export default defineConfig({
    plugins: [react()],
    server: {
        host: process.env.VITE_WEB_HOST?.replace(/^https?:\/\//, ''),
        port: Number(process.env.VITE_WEB_PORT),
        proxy: {
            "/api": process.env.VITE_API_PORT,
            },
        },
});
