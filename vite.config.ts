import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import viteSvgIcons from 'vite-plugin-svg-icons'
const { resolve } = require('path')
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api/': {
        target: 'http://192.168.23.119:8811',
        changeOrigin: true,
        rewrite(path) {
          return path.replace(/\/api/, '')
        },
      }
    }
  },
  plugins: [
    vue(),
    viteSvgIcons({
      iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
      symbolId: 'icon-[dir]-[name]'
    }),
    vueSetupExtend(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "./src/scss/_global.scss" as *;', // 添加公共样式
      },
    },
  },
  build: {
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'element-plus', 'tailwindcss', 'file-saver', 'nprogress', 'lodash', 'echarts', 'axios',
        'dayjs', 'clipboard', 'qrcode', 'screenfull', 'vue-i18n', 'wangeditor', 'xlsx', 'vuex'],
      output: {
        inlineDynamicImports: true,
        // sourcemap: true,
        // format: 'umd',
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'element-plus': 'elementPlus',
          'tailwindcss': 'tailwindcss',
          'file-saver': 'fileSaver',
          'nprogress': 'nprogress',
          'lodash': 'lodash',
          'echarts': 'echarts',
          'axios': 'axios',
          'dayjs': 'dayjs',
          'clipboard': 'clipboard',
          'qrcode': 'qrcode',
          'screenfull': 'screenfull',
          'vue-i18n': 'vueI18n',
          'wangeditor': 'wangeditor',
          'xlsx': 'xlsx',
          'vuex': 'vuex'
        }
      }
    },
    lib: {
      entry: './src/components/index.ts',
      name: 'vue3-components'
    }
  }

})
