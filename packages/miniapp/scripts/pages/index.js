const fs = require('fs')
const { join } = require('path')

const modules = {}
const files = fs.readdirSync(__dirname)
// 使用filter过滤掉不需要的文件，然后将需要的文件导入到modules中
files
  .filter((it) => !/^index/.test(it)) // 导入除index.js之外的js文件
  .forEach((it) => {
    // 拼接文件路径
    const fPath = join(__dirname, it)
    // 将文件引入进mocks
    const fileName = it.split('.')[0]
    modules[fileName] = { ...require(fPath) } // 使用文件名做key进行映射
  })

module.exports = modules
