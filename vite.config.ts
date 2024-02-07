import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    authToken: process.env.SENTRY_AUTH_TOKEN,
    org: "tekcatz",
    project: "tax-calculator-web",
  })],

  server: {
    port: 3000
  },

  css: {
    devSourcemap: true
  },

  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    }
  },

  build: {
    sourcemap: true
  }
})
