import { fileURLToPath, URL } from 'node:url'
import Unocss from 'unocss/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import legacy from '@vitejs/plugin-legacy'
import { createHtmlPlugin } from 'vite-plugin-html'
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    legacy({
      targets: ['Android >= 4.4', 'not IE 11'],
    }),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: ['vue', 'vue-router', 'pinia'],
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: 'readonly', // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      dts: false,
    }),
    Components({
      // 指定组件位置，默认是src/components
      dirs: ['src/components'],
      // ui库解析器
      resolvers: [VantResolver()],
      extensions: ['vue'],
    }),
    Unocss({
      rules: [
        [
          /^u-line-(\d)$/,
          ([, d]) => ({
            '-webkit-line-clamp': d,
            overflow: 'hidden',
            'word-break': 'break-all',
            'text-overflow': 'ellipsis',
            display: '-webkit-box',
            '-webkit-box-orient': 'vertical',
          }),
        ],
      ],
    }),
    createHtmlPlugin({
      inject: {
        data: {
          injectScript: `
  <script>
  document.write("<script type='text/javascript' src='./config.js?v=" + Date.now() + "'><\\/script>");
  </script>
  `,
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     less: {
  //       modifyVars: {
  //         'tabs-bottom-bar-color': 'gray',
  //         hack: `true; @import "./src/assets/vant.theme.less";`,
  //       },
  //     },
  //   },
  // },
  server: {
    open: true,
    fs: {
      strict: true,
    },
    proxy: {
      '/ditu': {
        // target: 'https://cmcdev.cleartv.cn',
        target: 'https://pqncdn.cleartv.cn/huludao',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ditu/, ''),
      },
      '/api': {
        target: 'https://tourismbackenddev.pcleartv.cn/',
        // target: 'https://tourismbackend.pcleartv.cn/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
