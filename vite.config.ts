import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

import { resolve } from 'path'

const projectRoot = process.env.PROJECT_ROOT || import.meta.dirname

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  // Plugins Spark retirés pour permettre l'import direct des icônes Phosphor
  ],
  resolve: {
    alias: {
      '@': resolve(projectRoot, 'src')
    }
  },
  build: {
    // Optimisations simplifiées pour éviter les erreurs
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('/react/') || id.includes('react-router')) {
              return 'vendor'
            }
            if (id.includes('@phosphor-icons')) {
              return 'icons'
            }
            if (id.includes('@radix-ui')) {
              return 'ui'
            }
          }
        },
        // Noms de fichiers avec hash pour cache busting optimal
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Optimisations de cache
    cssMinify: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000
  },
  server: {
    hmr: {
      overlay: false
    },
    proxy: {
      '/api/tailscale': {
        target: 'http://100.79.95.114:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/tailscale/, ''),
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            // Headers d'authentification pour Tailscale
            if (req.headers['apikey']) {
              proxyReq.setHeader('apikey', req.headers['apikey']);
            }
            if (req.headers['authorization']) {
              proxyReq.setHeader('authorization', req.headers['authorization']);
            }
            // Headers CORS
            proxyReq.setHeader('Access-Control-Allow-Origin', '*');
            proxyReq.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            proxyReq.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, apikey');
            
            // console.log(`🔄 Proxy Tailscale: ${req.method} ${req.url}`);
          });
          
          proxy.on('proxyRes', (proxyRes, _req, _res) => {
            // Headers CORS pour Tailscale
            proxyRes.headers['Access-Control-Allow-Origin'] = '*';
            proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';  
            proxyRes.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization, apikey';
          });
        }
      }
    }
  }
});
