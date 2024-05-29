import cn from './locale/cn.js'
import en from './locale/en.js'

export default function $t(name) {
  if (!name) return ''
  const { language } = useStore('scenic')

  const items = language.value === 'cn' ? cn : en

  return items[name] || name
}
