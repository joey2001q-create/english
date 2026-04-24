import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/ygtpc_lbenglish/',
  plugins: [react()],
  assetsInclude: ['**/*.json'],
  server: {
    proxy: {
      '/api/xf': {
        target: 'https://maas-coding-api.cn-huabei-1.xf-yun.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/xf/, '/v2'),
      },
    },
  },
})
