import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

import { resolve } from 'path'

const projectRoot = process.env.PROJECT_ROOT || import.meta.dirname

// https://vite.dev/config/
export default defineConfig({
  cacheDir: resolve(projectRoot, 'node_modules/.vite'),
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
    // Nécessaire pour les partages réseau (UNC paths)
    fs: {
      strict: false,
      allow: [projectRoot]
    },
    watch: {
      usePolling: true,
      interval: 1000,
      ignored: ['**/.env*', '**/node_modules/**']
    }
  }
});
