import presetWeapp from 'unocss-preset-weapp'
import { defineConfig, presetIcons } from 'unocss'
// https://github.com/unocss/unocss
import { transformerAttributify, transformerClass } from 'unocss-preset-weapp/transformer'

function getSizeRules(Mapping) {
  return Object.keys(Mapping).map((key) => {
    const value = Mapping[key]
    return [new RegExp(`^${key}(\\d+)$`), ([, d]) => ({ [value]: `${d}rpx` })]
  })
}

export const createConfig = () => {
  return defineConfig({
    presets: [
      presetWeapp(),
      presetIcons({
        prefix: '',
        extraProperties: {
          display: 'inline-block',
          cursor: 'pointer',
          'font-size': '20px',
        },
      }),
    ],
    include: [/\.vue$/, /pages.json$/],
    shortcuts: {
      'flex-center': 'flex items-center justify-center',
    },
    transformers: [
      // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
      transformerAttributify(),
      // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
      transformerClass(),
    ],
  })
}

export default createConfig()
