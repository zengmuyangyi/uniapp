// ArrayBuffer转16进度字符串示例
export function ab2hex(buffer) {
  const hexArr = Array.prototype.map.call(new Uint8Array(buffer), function (bit) {
    return ('00' + bit.toString(16)).slice(-2)
  })
  return hexArr.join('')
}
// 16进制字符串转为ArrayBuffer
export function hex2ab(hex) {
  const typedArray = new Uint8Array(
    hex.match(/[\da-f]{2}/gi).map(function (h) {
      return parseInt(h, 16)
    })
  )
  return typedArray.buffer
}
// 16进制转2进制.长度不能超过13位.hex必须为字符串
export function hex2bin(hex) {
  return parseInt(hex, 16).toString(2)
}
// 2进制转16进制.bin必须为字符串
export function bin2hex(bin) {
  return parseInt(bin, 2).toString(16)
}
// 16进制转10进制
export function hex2decimal(hex) {
  return parseInt(hex, 16).toString(10)
}
// 10进制转16进制
export function decimal2hex(decimal) {
  return parseInt(decimal).toString(16)
}
// 10进制转2进制
export function decimal2bin(decimal) {
  return parseInt(decimal).toString(2)
}
// 2进制转10进制
export function bin2decimal(bin) {
  return parseInt(bin, 2)
}
// 符号2进制转10进制
export function bin2decimalWithSymbol(bin) {
  if (bin.startsWith('1')) {
    let d = ''
    const arr = bin.split('')
    for (let i = 1; i < arr.length; i++) {
      arr[i] == 1 ? (d += '0') : (d += '1')
    }
    return -1 * (parseInt(d, 2) + 1)
  }
  return parseInt(bin, 2)
}
// 通过180A 2A23读取Mac地址
export function readMacFromCid(buffer) {
  const hexArr = Array.prototype.map.call(new Uint8Array(buffer), function (bit) {
    return ('00' + bit.toString(16)).slice(-2)
  })
  return `${hexArr[7]}:${hexArr[6]}:${hexArr[5]}:${hexArr[2]}:${hexArr[1]}:${hexArr[0]}`
}

//console.log(parseInt('0xff', 16).toString(2))
//console.log(parseInt('11111111', 2).toString(16))
//console.log(parseInt(255).toString(16))
