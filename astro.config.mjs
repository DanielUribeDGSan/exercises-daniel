import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [react()],
  vite: {
    optimizeDeps: {
      force: true,
      include: ['react', 'react-dom', 'react/jsx-runtime', 'lucide-react', 'vaul'],
    },
  },
});
