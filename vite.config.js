import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.json'],
  server: {
    proxy: {
      '/api/xf': {
        target: 'https://ark.cn-beijing.volces.com/api/coding',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/xf/, '/v3'),
      },
    },
  },
})
