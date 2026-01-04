import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    // Get API key from environment (works in both local and Vercel)
    // In Vercel, environment variables are available in process.env during build
    const apiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';
    
    if (!apiKey && mode === 'production') {
      console.warn('⚠️  GEMINI_API_KEY is not set. Translation feature will not work.');
    }
    
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(apiKey),
        'process.env.GEMINI_API_KEY': JSON.stringify(apiKey),
        'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(apiKey)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
