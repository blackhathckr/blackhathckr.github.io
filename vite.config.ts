import path from "path"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa";


export default defineConfig({
  plugins: [react(),VitePWA({
    registerType: 'autoUpdate',
    devOptions: {
      enabled: true, // Enable PWA in development mode
    },
    manifest: {
      name: 'Smart Wardrobe',
      short_name: 'Smart Wardrobe',
      description: 'Smart Wardrobe',
      theme_color: '#ffffff', // Set the theme color here
      background_color: '#ffffff', // Set the background color here
      icons: [
        {
          src: '/smartwardrobe.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/smartwardrobe.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
      start_url: '/',
      display: 'standalone',
      orientation: 'portrait',
    },
    workbox: {
      // Workbox options can be specified here for advanced caching strategies
    },
  })],
  server: {
    allowedHosts: [
      '.ngrok-free.app',   // Allow all Ngrok URLs
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
