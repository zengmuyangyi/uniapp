import cn from './locale/cn.js'
import en from './locale/en.js'
import jp from './locale/jp.js'
import kor from './locale/kor.js'
import fra from './locale/fra.js'
import ru from './locale/ru.js'
import { useApp } from '@/stores'
export default function $t(name) {
  if (!name) return ''
  const { language } = useApp()

  let items
  switch (language) {
    case 'en':
      items = en
      break
    case 'jp':
      items = jp
      break
    case 'kor':
      items = kor
      break
    case 'fra':
      items = fra
      break
    case 'ru':
      items = ru
      break
    default:
      items = cn
      break
  }

  return items[name] || name
}
