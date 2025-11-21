import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    base: "./",
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            includeAssets: ["favicon.ico"],
            manifest: {
                name: "Space Shooter Game",
                short_name: "SpaceShooter",
                theme_color: "#000000",
                background_color: "#1f1f1fff",
                display: "standalone",
                orientation: "portrait",
                start_url: "/",
                icons: [
                    {
                        src: "icons/pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "icons/pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
        }),
    ],
    server: {
        port: 8080,
    },
});

