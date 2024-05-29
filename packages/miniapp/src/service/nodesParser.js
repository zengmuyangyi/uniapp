import htmlParser from '@/nPro/utils/htmlParser.js'

export default function parseHtml(val) {
  if (!val || val.trim().length === 0) {
    return []
  }
  return htmlParser(val)
}
