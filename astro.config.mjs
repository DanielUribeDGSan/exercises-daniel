import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  integrations: [react()],
  vite: {
    optimizeDeps: {
      force: true,
      include: ['react', 'react-dom', 'react/jsx-runtime', 'lucide-react', 'vaul'],
    },
    plugins: [
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: false,
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg', 'icon.svg'],
        manifest: {
          name: 'Forge App',
          short_name: 'Forge',
          description: 'Plan de entrenamiento en casa para perder grasa y ganar fuerza',
          theme_color: '#0a0a0a',
          background_color: '#0a0a0a',
          display: 'standalone',
          scope: '/',
          start_url: '/',
          orientation: 'portrait',
          icons: [
            {
              src: '/icon-72x72.png',
              sizes: '72x72',
              type: 'image/png'
            },
            {
              src: '/icon-96x96.png',
              sizes: '96x96',
              type: 'image/png'
            },
            {
              src: '/icon-128x128.png',
              sizes: '128x128',
              type: 'image/png'
            },
            {
              src: '/icon-144x144.png',
              sizes: '144x144',
              type: 'image/png'
            },
            {
              src: '/icon-152x152.png',
              sizes: '152x152',
              type: 'image/png'
            },
            {
              src: '/icon-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '/icon-384x384.png',
              sizes: '384x384',
              type: 'image/png'
            },
            {
              src: '/icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                }
              }
            }
          ]
        }
      })
    ]
  },
});
