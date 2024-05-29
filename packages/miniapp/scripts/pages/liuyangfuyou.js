const project = 'liuyangfuyou'
const theme = 'contractedRed' // 主题文件夹

module.exports = {
  pages: [
    {
      path: `pages/${project}/index/index`,
      style: {
        disableScroll: true,
        navigationStyle: 'custom',
      },
    },
    {
      path: `pages/${project}/share/index`,
      style: {
        disableScroll: true,
        navigationStyle: 'custom',
      },
    },
    {
      path: `pages/common/location/index`,
      style: {
        disableScroll: true,
        navigationBarTitleText: '正在跳转，请稍候',
      },
    },
  ],
}
