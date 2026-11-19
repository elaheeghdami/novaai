import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  base: mode === 'ghpages' ? '/novaai/' : '/',
  plugins: [react()],
  server: { port: 5199, host: true, allowedHosts: true },
  preview: { port: 5199, host: true, allowedHosts: true },
}));
