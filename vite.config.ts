import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

console.log('SENTRY_AUTH_TOKEN: ', process.env.SENTRY_AUTH_TOKEN)
console.log(process.env.NODE_ENV)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    authToken: process.env.SENTRY_AUTH_TOKEN,
    org: "tekcatz",
    project: "tax-calculator-web",
    debug: true,
    disable: false
  })],

  server: {
    port: 3000
  },

  css: {
    devSourcemap: process.env.NODE_ENV !== 'production'
  },

  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    }
  },

  build: {
    sourcemap: process.env.NODE_ENV !== 'production'
  },
})
