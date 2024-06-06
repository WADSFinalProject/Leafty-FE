import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import mkcert from 'vite-plugin-mkcert'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // server: {https: true},
  plugins: [react()],
  optimizeDeps: {
    exclude: [''],
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@style': path.resolve(__dirname, 'src/style')
    }
  }
})
