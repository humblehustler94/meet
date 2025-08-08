import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'; // <-- ADD THIS IMPORT

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // ADD THE VITE PWA PLUGIN CONFIGURATION HERE
    VitePWA({
      registerType: 'autoUpdate',
      // The manifest object is defined here. The plugin will use this
      // to generate the manifest.json file during the build.
      manifest: {
        "short_name": "Meet", // Your customized short name
        "name": "Meet App",   // Your customized full name
        "icons": [
          {
            // This is the corrected entry for your favicon
            "src": "favicon.ico.png",
            "sizes": "48x48",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "meet-app-144.png",
            "type": "image/png",
            "sizes": "144x144",
            "purpose": "any"
          },
          {
            "src": "meet-app-192.png",
            "type": "image/png",
            "sizes": "192x192",
            "purpose": "maskable"
          },
          {
            "src": "meet-app-512.png",
            "type": "image/png",
            "sizes": "512x512",
            "purpose": "maskable"
          }
        ],
        "start_url": ".",
        "display": "standalone",
        "theme_color": "#000000",
        "background_color": "#ffffff"
      },
      // Workbox configuration for offline caching
      workbox: {
        runtimeCaching: [
          {
            // This rule will cache all .png files using a "Stale While Revalidate" strategy.
            // This serves images from the cache first for speed, then updates them in the background.
            urlPattern: /\/.*\.png$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'images-cache', // A specific name for the image cache
              expiration: {
                maxEntries: 60, // Max number of images to cache
              },
            },
          },
        ],
      },
    })
  ],
})