/**
 * 用来快速生成props，返回值作为defineProps的参数
 * arr = ['name', ['type', 'primary'], ['items', [], Array]]
 * ['name', 'default', 'type']
 * 只接受：字符串，以及2-3个长度的数组，不接受1个长度的数组
 */
export function makeProps(arr = []) {
  const obj = {}

  // 不考虑纠错
  for (let i = 0; i < arr.length; i++) {
    const theI = arr[i]
    const tp = typeof theI
    if (tp == 'string') {
      obj[theI] = {
        type: String,
        default: '',
      }
    } else if (theI instanceof Array) {
      const dTp = typeof theI[1]
      const hasType = !!theI[2]
      switch (dTp) {
        case 'string':
          obj[theI[0]] = {
            type: hasType ? theI[2] : String,
            default: theI[1],
          }
          break
        case 'boolean':
          obj[theI[0]] = {
            type: hasType ? theI[2] : Boolean,
            default: theI[1],
          }
          break
        case 'number':
          obj[theI[0]] = {
            type: hasType ? theI[2] : Number,
            default: theI[1],
          }
          break
        case 'function':
          obj[theI[0]] = {
            type: hasType ? theI[2] : Function,
            default: () => {
              return theI[1]
            },
          }
          break
        case 'object':
          obj[theI[0]] = {
            type: hasType ? theI[2] : theI[1] instanceof Array ? Array : Object,
            default: () => {
              return theI[1]
            },
          }
          break
        default:
          break
      }
    }
  }

  return obj
}
