/**
 * 1 预置 1 个 16 位的寄存器为十六进制FFFF(即全为 1) , 称此寄存器为 CRC寄存器。

2 把第一个 8 位二进制数据 (通信信息帧的第一个字节) 与 16 位的 CRC寄存器的低 8 位相异或, 把结果放于 CRC寄存器。

3 把 CRC 寄存器的内容右移一位( 朝低位)用 0 填补最高位, 并检查右移后的移出位。

4 如果移出位为 0, 重复第 3 步 ( 再次右移一位); 如果移出位为 1, CRC 寄存器与多项式A001 ( 1010 0000 0000 0001) 进行异或。

5 重复步骤 3 和步骤 4, 直到右移 8 次,这样整个8位数据全部进行了处理。

6 重复步骤 2 到步骤 5, 进行通信信息帧下一个字节的处理。

7 将该通信信息帧所有字节按上述步骤计算完成后,得到的16位CRC寄存器的高、低字节进行交换。

8 最后得到的 CRC寄存器内容即为 CRC码。
 */

/**
 * MODBUS-RTU CRC校验
 * @param data {Buffer} Buffer对象16进制Hex
 * @return {any[]} 16进制高低位
 */
export default function MODBUS_CRC(data, complete = true) {
  let crcValue = 0xffff
  for (let i = 0; i < data.length; i++) {
    crcValue ^= data[i] & 0xffff
    for (let j = 0; j < 8; j++) {
      if (crcValue & 0x0001) {
        crcValue >>= 1
        crcValue ^= 0xa001
      } else {
        crcValue >>= 1
      }
    }
  }
  crcValue = crcValue.toString(16)
  if (complete) {
    const len = crcValue.length
    if (len == 3) {
      crcValue = '0' + crcValue
    } else if (len == 2) {
      crcValue = '00' + crcValue
    } else if (len == 1) {
      crcValue = '000' + crcValue
    } else if (len == 0) {
      crcValue = '0000'
    }
  }
  let crcArr = new Array(2)
  crcArr[0] = crcValue.substring(2, 4)
  crcArr[1] = crcValue.substring(0, 2)
  console.log('crc', crcValue, crcArr)
  return crcArr
}

export function testMODBUS_CRC() {
  console.log(MODBUS_CRC(new Buffer('010300000024', 'hex')))
}
