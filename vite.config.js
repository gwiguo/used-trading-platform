import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'

export default ({ mode }) => defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  server: {
    proxy: {
      "/user": {
        target: loadEnv(mode, process.cwd()).VITE_BACKEND,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/user/, ''),
      },
      "/login": {
        target: loadEnv(mode, process.cwd()).VITE_BACKEND,
        changeOrigin: true
      },
      "/goods": {
        target: loadEnv(mode, process.cwd()).VITE_BACKEND,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/goods/, ''),
      },
      "/getCity": {
        target: loadEnv(mode, process.cwd()).VITE_BACKEND,
        changeOrigin: true
      },
      "/upload": {
        target: loadEnv(mode, process.cwd()).VITE_BACKEND,
        changeOrigin: true
      },
      "/comment": {
        target: loadEnv(mode, process.cwd()).VITE_BACKEND,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/comment/, ''),
      },
      "/personal": {
        target: loadEnv(mode, process.cwd()).VITE_BACKEND,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/personal/, ''),
      },
      "/order_api": {
        target: loadEnv(mode, process.cwd()).VITE_BACKEND,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/order_api/, ''),
      },
    }
  }
})
