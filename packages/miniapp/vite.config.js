import { defineConfig, loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import Unocss from 'unocss/vite'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import legacy from '@vitejs/plugin-legacy'

// 导入页面配置
import './scripts/pages'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const plugins = [
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: [
        'vue',
        'uni-app',
        'pinia',
        {
          '@/helper/pinia-auto-refs': ['useStore'],
          '@/service/util': ['navigateTo'],
        },
      ],
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
      // resolvers: [VantResolver()],
      extensions: ['vue'],
    }),
    uni(),
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
        ['u-text-color', { color: '#735713' }],
      ],
    }),
  ]

  // if (env.UNI_PLATFORM === 'h5') {
  //   plugins.push(
  //     legacy({
  //       targets: ['Android >= 4.4', 'not IE 11'],
  //     })
  //   )
  // }

  return {
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    plugins,
    define: {
      UNI_PLATFORM: `"${env.UNI_PLATFORM}"`,
      UNI_PROJECT: `"${env.project || 'default'}"`,
    },
    server: {
      proxy: {
        '/api': {
          target: 'https://tourismbackenddev.pcleartv.cn/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/szgbxy': {
          // target: 'https://nettraindev.pcleartv.cn/',
          target: 'https://www.szgx.suzhou.gov.cn',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/szgbxy/, ''),
        },
      },
    },
  }
})
