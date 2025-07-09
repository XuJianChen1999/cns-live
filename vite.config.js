import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import { VantResolver } from '@vant/auto-import-resolver'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import postcssPxToViewport from 'postcss-px-to-viewport'

export default defineConfig({
  // base: `/cns-live/`,
  plugins: [
    vue(),
    AutoImport({ imports: ['vue', 'vue-router'] }),
    Components({
      resolvers: [VantResolver()],
    }),
    createSvgIconsPlugin({
      // eslint-disable-next-line no-undef
      iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
      symbolId: 'svg-icon-[dir]-[name]',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
  build: {
    // outDir: 'cns-live',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        },
      },
    },
  },
  server: {
    open: true,
    port: 3000,
  },
  css: {
    postcss: {
      plugins: [
        postcssPxToViewport({
          unitToConvert: 'px', // 要转化的单位
          viewportWidth: 375, // 视窗的宽度
          unitPrecision: 6, // 转换后值的精度
          viewportUnit: 'vw', // 转换成的视口单位
          minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
          mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
          replace: true, // 是否转换后直接更换属性值
          propList: ['*', '!border*', '!border-radius'],
          exclude: [/node_modules/],
        }),
      ],
    },
  },
})
