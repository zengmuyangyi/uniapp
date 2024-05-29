// 样式格式化/排版风格替换
// 这里仅仅是个示范，如果你的排版风格和主题不一样，可以随意修改
//
const formattor = [
  // div 样式
  ['div', 'font-size:16px;line-height:24px;'],
  // h1 样式
  ['h1', 'font-size:42px; line-height:60px;'],
  // h2 样式
  ['h2', 'font-size:28px; line-height:50px;'],
  // h3 样式
  ['h3', 'font-size:22px; line-height:40px;'],
  // h4 样式
  ['h4', 'font-size:16px; line-height:32px;'],
  // h5 样式
  ['h5', 'font-size:14px; line-height:24px;'],
  // h6 样式
  ['h6', 'font-size:12px; line-height:20px;'],
  // p 样式
  ['p', 'font-size:16px; line-height:24px; margin-top: 4px; margin-bottom: 4px;'],
  // b 样式
  ['b', 'font-size:16px; line-height:24px;'],
  // strong 样式
  ['strong', 'font-size:16px; line-height:24px; font-weight: 700;'],
  // code 样式
  [
    'code',
    'font-size:14px; line-height:18px; background:#F6F7F8; padding-top: 4px; padding-bottom: 4px; padding-left: 4px; padding-right: 4px;',
  ],
  // img 样式
  ['img', 'width:750rpx !important;height:auto !important; margin-top: 4px; margin-bottom: 4px; '],
  // blockquote
  [
    'blockquote',
    'font-size:14px; border-left:3px solid #D1D1D1; line-height:24px; border-radius:5px; background:#F6F7F8; padding-top: 4px; padding-bottom: 4px; padding-left: 4px; padding-right: 4px;',
  ],
  // li 样式
  ['ul', 'padding:5px 0; list-style:none; padding:0; margin:0;'],
  ['li', 'line-height:24px; padding:5px 0; list-style:none; padding:0; margin:0; margin-top:10px;'],
  // table
  ['table', 'width:100%; border-left:1px solid #F2F3F4; border-top:1px solid #F2F3F4;'],
  ['th', 'border-right:1px solid #F2F3F4; border-bottom:1px solid #F2F3F4;'],
  ['td', 'border-right:1px solid #F2F3F4; border-bottom:1px solid #F2F3F4; padding-left:5px;'],
]

export default {
  format: function (html) {
    if (!html || html.length === 0) {
      return ''
    }
    html = html.replace(/<figure/gi, '<div')
    html = html.replace(/<\/figure/gi, '</div')
    html = html.replace(/<pre.*pre>?/gis, function (word) {
      word = word.replace(/[\n]/gi, '<br />')
      word = word.replace(/ {4}/gi, '<span style="padding-left:2em;"></span>')
      return word.replace(/[\t]/gi, '<span style="padding-left:2em;"></span>')
    })
    html = html.replace(
      /<pre/gi,
      '<p style="font-size:14px; margin-top: 8px; margin-bottom: 8rpx; line-height:24px;"'
    )
    html = html.replace(/<\/pre/gi, '</p')
    for (let i = 0; i < formattor.length; i++) {
      const reg = new RegExp('<' + formattor[i][0] + '>|<' + formattor[i][0] + ' (.*?)>', 'gi')
      html = html.replace(reg, function (word) {
        // 分析 dom 上是否带有 style=""
        if (word.indexOf('style=') !== -1) {
          const regIn = new RegExp('<' + formattor[i][0] + '(.*?)style="(.*?)"(.*?)(/?)>', 'gi')
          return word.replace(
            regIn,
            '<' + formattor[i][0] + '$1style="$2 ' + formattor[i][1] + '"$3$4>'
          )
        }
        const regIn = new RegExp('<' + formattor[i][0] + '(.*?)(/?)>', 'gi')
        return word.replace(regIn, '<' + formattor[i][0] + '$1 style="' + formattor[i][1] + '$2">')
      })
    }
    console.log('%c [ html ]-79', 'font-size:13px; background:pink; color:#bf2c9f;', html)
    return html
  },
}
