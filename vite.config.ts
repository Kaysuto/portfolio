import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, PluginOption } from "vite";

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
    // Optimisations Lighthouse améliorées
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks séparés
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'react-vendor'
            }
            if (id.includes('@phosphor-icons')) {
              return 'phosphor-icons'
            }
            if (id.includes('@radix-ui')) {
              return 'radix-ui'
            }
            if (id.includes('sonner')) {
              return 'sonner'
            }
            return 'vendor'
          }
          // Composants UI en chunk séparé
          if (id.includes('/components/ui/')) {
            return 'ui-components'
          }
          // Sections principales en chunks séparés
          if (id.includes('Section.tsx')) {
            return 'sections'
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
      '/api/supabase': {
        target: 'https://db.kaysuto.fr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/supabase/, ''),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // Transmettre les headers d'authentification originaux
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
            
            console.log(`🔄 Proxy Supabase: ${req.method} ${req.url}`);
            console.log(`📋 Headers transmis:`, {
              apikey: req.headers['apikey'] ? 'présent' : 'absent',
              authorization: req.headers['authorization'] ? 'présent' : 'absent'
            });
          });
          
          proxy.on('proxyRes', (proxyRes, req, res) => {
            // Ajouter les headers CORS à la réponse
            proxyRes.headers['Access-Control-Allow-Origin'] = '*';
            proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
            proxyRes.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization, apikey';
          });
        }
      },
      '/api/tailscale': {
        target: 'http://100.79.95.114:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/tailscale/, ''),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
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
            
            console.log(`🔄 Proxy Tailscale: ${req.method} ${req.url}`);
          });
          
          proxy.on('proxyRes', (proxyRes, req, res) => {
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
