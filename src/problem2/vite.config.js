import { defineConfig } from 'vite'

export default defineConfig({
  // Base public path when served in production
  base: './',
  
  // Development server configuration
  server: {
    port: 3000,
    open: true, // Automatically open browser
    host: true, // Listen on all addresses
    cors: true, // Enable CORS for API calls
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: undefined, // Bundle everything together for simplicity
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [],
  },
  
  // CSS configuration
  css: {
    devSourcemap: true,
  },
  
  // Define global constants
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  
  // Plugin configuration
  plugins: [],
}) 